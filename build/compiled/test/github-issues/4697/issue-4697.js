"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #4697 Revert migrations running in reverse order.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        migrations: [__dirname + "/migration/*.js"],
        enabledDrivers: ["mongodb"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should revert migrations in the right order", () => Promise.all(connections.map(async (connection) => {
        await connection.runMigrations();
        await connection.undoLastMigration();
        const [lastMigration] = await connection.runMigrations();
        lastMigration.should.have.property("timestamp", 1567689639607);
        lastMigration.should.have.property("name", "MergeConfigs1567689639607");
    })));
});
//# sourceMappingURL=issue-4697.js.map