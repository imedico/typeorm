"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
describe("LegacyOracleNamingStrategy > create table using default naming strategy", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["oracle"],
    })));
    // without reloadTestingDatabases(connections) -> tables should be created later
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not create the table and fail due to ORA-00972", () => Promise.all(connections.map(async (connection) => {
        await (0, chai_1.expect)((0, test_utils_1.reloadTestingDatabases)([connection])).to.be.rejectedWith(/ORA-00972/gi);
    })));
});
//# sourceMappingURL=create-table.js.map