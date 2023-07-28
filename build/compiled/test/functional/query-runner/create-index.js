"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Table_1 = require("../../../src/schema-builder/table/Table");
const TableIndex_1 = require("../../../src/schema-builder/table/TableIndex");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("query runner > create index", () => {
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
    it("should correctly create index and revert creation", () => Promise.all(connections.map(async (connection) => {
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
                {
                    name: "description",
                    type: stringType,
                },
            ],
        }), true);
        // clear sqls in memory to avoid removing tables when down queries executed.
        queryRunner.clearSqlMemory();
        const index = new TableIndex_1.TableIndex({
            columnNames: ["name", "description"],
        });
        await queryRunner.createIndex("question", index);
        const uniqueIndex = new TableIndex_1.TableIndex({
            columnNames: ["description"],
            isUnique: true,
        });
        await queryRunner.createIndex("question", uniqueIndex);
        let table = await queryRunner.getTable("question");
        // CockroachDB stores unique indices as UNIQUE constraints
        if (connection.driver.options.type === "cockroachdb") {
            table.indices.length.should.be.equal(1);
            table.uniques.length.should.be.equal(1);
        }
        else {
            table.indices.length.should.be.equal(2);
        }
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("question");
        table.indices.length.should.be.equal(0);
        table.uniques.length.should.be.equal(0);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-index.js.map