"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
describe("migrations > show command", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        migrations: [__dirname + "/migration/*.js"],
        enabledDrivers: ["postgres", "sqlite"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("can recognise pending migrations", () => Promise.all(connections.map(async (connection) => {
        const migrations = await connection.showMigrations();
        migrations.should.be.equal(true);
    })));
    it("can recognise no pending migrations", () => Promise.all(connections.map(async (connection) => {
        await connection.runMigrations();
        const migrations = await connection.showMigrations();
        migrations.should.be.equal(false);
    })));
});
//# sourceMappingURL=command.js.map