"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #6699 MaxListenersExceededWarning occurs on Postgres", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("queries in a transaction do not cause an EventEmitter memory leak", () => Promise.all(connections.map(async (connection) => {
        await connection.transaction(async (manager) => {
            const queryPromises = [...Array(10)].map(() => manager.query("SELECT pg_sleep(0.0001)"));
            const pgConnection = await manager.queryRunner.connect();
            (0, chai_1.expect)(pgConnection.listenerCount("error")).to.equal(1);
            // Wait for all of the queries to finish and drain the backlog
            await Promise.all(queryPromises);
        });
    })));
});
//# sourceMappingURL=issue-6699.js.map