"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #4701 Duplicate migrations are executed.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        migrations: [__dirname + "/migration/*.js"],
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should throw error if there're duplicate migrations", () => Promise.all(connections.map(async (connection) => {
        await (0, chai_1.expect)(connection.runMigrations()).to.be.rejectedWith(Error, "Duplicate migrations: ExampleMigrationOne1567759789051");
    })));
});
//# sourceMappingURL=issue-4701.js.map