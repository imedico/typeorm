"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #6958 Promises never get resolved in specific cases", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should release all used query runners upon disconnection", () => Promise.all(connections.map(async (connection) => {
        const runner1 = connection.createQueryRunner();
        await runner1.query("SELECT 1 as foo;"); // dummy query to ensure that a database connection is established
        const runner2 = connection.createQueryRunner();
        await runner2.query("SELECT 2 as foo;");
        await connection.close();
        (0, chai_1.expect)(runner1.isReleased).to.be.true;
        (0, chai_1.expect)(runner2.isReleased).to.be.true;
        (0, chai_1.expect)(connection.driver.connectedQueryRunners
            .length).to.equal(0);
    })));
});
//# sourceMappingURL=issue-6958.js.map