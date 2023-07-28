"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("better-sqlite3 driver > enable wal", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [],
        enabledDrivers: ["better-sqlite3"],
        driverSpecific: {
            enableWAL: true,
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("github issues > #9410 The better-sqlite3 driver should support the enableWal flag", () => Promise.all(connections.map(async (connection) => {
        const result = await connection.query("PRAGMA journal_mode");
        (0, chai_1.expect)(result).to.eql([{ journal_mode: "wal" }]);
    })));
});
//# sourceMappingURL=issue-9410.js.map