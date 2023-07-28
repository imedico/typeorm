"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Example_1 = require("./entity/Example");
describe("github issues > #8011 Enum values with multiple apostrophes not properly escaped in MySQL", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mysql"],
            entities: [Example_1.Example],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should properly escape all apostrophes", () => Promise.all(connections.map(async (connection) => {
        await connection.driver.createSchemaBuilder().build();
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries.length).to.be.greaterThan(0);
        (0, chai_1.expect)(sqlInMemory.upQueries.some(({ query }) => query.includes("Men''s and Women''s Clothing"))).to.be.true;
    })));
});
//# sourceMappingURL=issue-8011.js.map