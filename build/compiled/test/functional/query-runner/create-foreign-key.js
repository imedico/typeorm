"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Table_1 = require("../../../src/schema-builder/table/Table");
const TableForeignKey_1 = require("../../../src/schema-builder/table/TableForeignKey");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("query runner > create foreign key", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create foreign key and revert creation", () => Promise.all(connections.map(async (connection) => {
        let numericType = "int";
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver)) {
            numericType = "integer";
        }
        else if (connection.driver.options.type === "spanner") {
            numericType = "int64";
        }
        let stringType = "varchar";
        if (connection.driver.options.type === "spanner") {
            stringType = "string";
        }
        const queryRunner = connection.createQueryRunner();
        await queryRunner.createTable(new Table_1.Table({
            name: "question",
            columns: [
                {
                    name: "id",
                    type: numericType,
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: stringType,
                },
            ],
        }), true);
        await queryRunner.createTable(new Table_1.Table({
            name: "answer",
            columns: [
                {
                    name: "id",
                    type: numericType,
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: stringType,
                },
                {
                    name: "questionId",
                    isUnique: connection.driver.options.type ===
                        "cockroachdb",
                    type: numericType,
                },
            ],
        }), true);
        // clear sqls in memory to avoid removing tables when down queries executed.
        queryRunner.clearSqlMemory();
        const foreignKey = new TableForeignKey_1.TableForeignKey({
            columnNames: ["questionId"],
            referencedColumnNames: ["id"],
            referencedTableName: "question",
            onDelete: "CASCADE",
        });
        await queryRunner.createForeignKey("answer", foreignKey);
        let table = await queryRunner.getTable("answer");
        table.foreignKeys.length.should.be.equal(1);
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("answer");
        table.foreignKeys.length.should.be.equal(0);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-foreign-key.js.map