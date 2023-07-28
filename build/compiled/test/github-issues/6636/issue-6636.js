"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Test_1 = require("./entity/Test");
const chai_1 = require("chai");
describe("github issues > #6636 migration issues with scale & precision", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Test_1.Test],
        enabledDrivers: ["sqljs", "sqlite", "better-sqlite3"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not create migrations columns with precision", async () => {
        await Promise.all(connections.map(async (connection) => {
            const sqlInMemory = await connection.driver
                .createSchemaBuilder()
                .log();
            (0, chai_1.expect)(sqlInMemory.upQueries).to.eql([]);
            (0, chai_1.expect)(sqlInMemory.downQueries).to.eql([]);
        }));
    });
});
//# sourceMappingURL=issue-6636.js.map