"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #2875 runMigrations() function is not returning a list of migrated files", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        migrations: [__dirname + "/migration/*.js"],
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to run all necessary migrations", () => Promise.all(connections.map(async (connection) => {
        const mymigr = await connection.runMigrations();
        mymigr.length.should.be.equal(1);
        mymigr[0].name.should.be.equal("InitUsers1530542855524");
    })));
});
//# sourceMappingURL=issue-2875.js.map