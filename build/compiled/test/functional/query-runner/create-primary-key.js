"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Table_1 = require("../../../src/schema-builder/table/Table");
describe("query runner > create primary key", () => {
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
    it("should correctly create primary key and revert creation", () => Promise.all(connections.map(async (connection) => {
        // CockroachDB and Spanner does not allow altering primary key
        if (connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "spanner")
            return;
        const queryRunner = connection.createQueryRunner();
        await queryRunner.createTable(new Table_1.Table({
            name: "category",
            columns: [
                {
                    name: "id",
                    type: "int",
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ],
        }), true);
        await queryRunner.createTable(new Table_1.Table({
            name: "person",
            columns: [
                {
                    name: "id",
                    type: "int",
                },
                {
                    name: "userId",
                    type: "int",
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ],
        }), true);
        // clear sqls in memory to avoid removing tables when down queries executed.
        queryRunner.clearSqlMemory();
        await queryRunner.createPrimaryKey("category", ["id"]);
        await queryRunner.createPrimaryKey("person", ["id", "userId"]);
        let categoryTable = await queryRunner.getTable("category");
        categoryTable.findColumnByName("id").isPrimary.should.be.true;
        let personTable = await queryRunner.getTable("person");
        personTable.findColumnByName("id").isPrimary.should.be.true;
        personTable.findColumnByName("userId").isPrimary.should.be
            .true;
        await queryRunner.executeMemoryDownSql();
        categoryTable = await queryRunner.getTable("category");
        categoryTable.findColumnByName("id").isPrimary.should.be.false;
        personTable = await queryRunner.getTable("person");
        personTable.findColumnByName("id").isPrimary.should.be.false;
        personTable.findColumnByName("userId").isPrimary.should.be
            .false;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-primary-key.js.map