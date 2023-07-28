"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("sqlite driver > throws an error when queried after closing connection", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [],
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should throw", () => Promise.all(connections.map(async (connection) => {
        await connection.close();
        await (0, chai_1.expect)(connection.query("select * from sqlite_master;")).to.rejectedWith("Connection with sqlite database is not established. Check connection configuration.");
    })));
});
//# sourceMappingURL=error-on-query-after-close.js.map