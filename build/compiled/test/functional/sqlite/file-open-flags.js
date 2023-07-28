"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const sqlite3 = require("sqlite3");
describe("sqlite driver > file open flags", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        name: "file:./temp/sqlitedb-memory.db?mode=memory",
        entities: [],
        enabledDrivers: ["sqlite"],
        driverSpecific: {
            flags: sqlite3.OPEN_URI |
                sqlite3.OPEN_SHAREDCACHE |
                sqlite3.OPEN_READWRITE |
                sqlite3.OPEN_CREATE,
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should open a DB with flags as expected", () => Promise.all(connections.map(async (connection) => {
        // if we come this far, test was successful as a connection was established
        const result = await connection.query("PRAGMA journal_mode");
        (0, chai_1.expect)(result).to.eql([{ journal_mode: "wal" }]);
    })));
});
//# sourceMappingURL=file-open-flags.js.map