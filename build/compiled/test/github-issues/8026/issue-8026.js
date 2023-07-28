"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Sailing_1 = require("./entity/Sailing");
const ScheduledSailing_1 = require("./entity/ScheduledSailing");
describe("github issues > #8026 Inserting a value for a column that has a relation, and is also a date, results in the value being inserted as DEFAULT", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Sailing_1.Sailing, ScheduledSailing_1.ScheduledSailing],
        schemaCreate: true,
        dropSchema: true,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("it should include a related date column in the constructed query", async () => await Promise.all(connections.map(async (connection) => {
        let queryBuilder = await connection.createQueryBuilder();
        const insertValue = {
            scheduled_departure_time: new Date(),
            scheduled_arrival_time: new Date(),
        };
        const [query, params] = await queryBuilder
            .insert()
            .into(ScheduledSailing_1.ScheduledSailing)
            .values([insertValue])
            .getQueryAndParameters();
        (0, chai_1.expect)(query.includes("DEFAULT")).to.be.false;
        (0, chai_1.expect)(params).length(2);
    })));
});
//# sourceMappingURL=issue-8026.js.map