"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("query runner > create and drop database", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql", "mssql", "cockroachdb", "postgres"],
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create and drop database and revert it", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.createDatabase("myTestDatabase", true);
        let hasDatabase = await queryRunner.hasDatabase("myTestDatabase");
        hasDatabase.should.be.true;
        await queryRunner.dropDatabase("myTestDatabase");
        hasDatabase = await queryRunner.hasDatabase("myTestDatabase");
        hasDatabase.should.be.false;
        await queryRunner.executeMemoryDownSql();
        hasDatabase = await queryRunner.hasDatabase("myTestDatabase");
        hasDatabase.should.be.false;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-and-drop-database.js.map