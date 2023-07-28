"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("sqlite driver > busy-timeout", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [],
        enabledDrivers: ["sqlite"],
        driverSpecific: {
            busyTimeout: 2000,
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should set the busy_timeout as expected", () => Promise.all(connections.map(async (connection) => {
        const result = await connection.query("PRAGMA busy_timeout");
        (0, chai_1.expect)(result).to.eql([{ timeout: 2000 }]);
    })));
});
//# sourceMappingURL=busy-timeout.js.map