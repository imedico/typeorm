"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #3588 Migration:generate issue with onUpdate using mysql 8.0", async () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["mysql"],
    })));
    beforeEach(async () => await (0, test_utils_1.reloadTestingDatabases)(connections));
    after(async () => await (0, test_utils_1.closeTestingConnections)(connections));
    it("can recognize model changes", () => Promise.all(connections.map(async (connection) => {
        const schemaBuilder = connection.driver.createSchemaBuilder();
        const syncQueries = await schemaBuilder.log();
        (0, chai_1.expect)(syncQueries.downQueries).to.be.eql([]);
        (0, chai_1.expect)(syncQueries.upQueries).to.be.eql([]);
    })));
});
//# sourceMappingURL=issue-3588.js.map