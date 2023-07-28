"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("query runner > drop unique constraint", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: [
                "mssql",
                "postgres",
                "sqlite",
                "better-sqlite3",
                "oracle",
                "cockroachdb",
            ],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly drop unique constraint and revert drop", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table.uniques.length.should.be.equal(2);
        // find composite unique constraint to delete
        const unique = table.uniques.find((u) => u.columnNames.length === 2);
        await queryRunner.dropUniqueConstraint(table, unique);
        table = await queryRunner.getTable("post");
        table.uniques.length.should.be.equal(1);
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        table.uniques.length.should.be.equal(2);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=drop-unique-constraint.js.map