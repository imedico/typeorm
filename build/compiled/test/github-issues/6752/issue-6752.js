"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Block_1 = require("./entity/Block");
const PlanOfRecord_1 = require("./entity/PlanOfRecord");
describe("github issues > #6752 column name not been find on unique index decorator", () => {
    it("dont change anything", async () => {
        let connections;
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Block_1.Block, PlanOfRecord_1.PlanOfRecord],
            schemaCreate: false,
            dropSchema: true,
            enabledDrivers: ["mssql"],
        });
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        await Promise.all(connections.map(async (connection) => {
            const schemaBuilder = connection.driver.createSchemaBuilder();
            const syncQueries = await schemaBuilder.log();
            (0, chai_1.expect)(syncQueries.downQueries).to.be.eql([]);
            (0, chai_1.expect)(syncQueries.upQueries).to.be.eql([]);
        }));
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
});
//# sourceMappingURL=issue-6752.js.map