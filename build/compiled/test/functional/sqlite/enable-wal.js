"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("sqlite driver > enable wal", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [],
        enabledDrivers: ["sqlite"],
        driverSpecific: {
            enableWAL: true,
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should set the journal mode as expected", () => Promise.all(connections.map(async (connection) => {
        // if we come this far, test was successful as a connection was established
        const result = await connection.query("PRAGMA journal_mode");
        (0, chai_1.expect)(result).to.eql([{ journal_mode: "wal" }]);
    })));
});
//# sourceMappingURL=enable-wal.js.map