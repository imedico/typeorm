"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const LegacyOracleNamingStrategy_1 = require("../../../../../src/naming-strategy/LegacyOracleNamingStrategy");
describe("LegacyOracleNamingStrategy > create table using this naming strategy", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["oracle"],
        namingStrategy: new LegacyOracleNamingStrategy_1.LegacyOracleNamingStrategy("hash"),
    })));
    // without reloadTestingDatabases(connections) -> tables should be created later
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create the table", () => Promise.all(connections.map(async (connection) => {
        await (0, chai_1.expect)((0, test_utils_1.reloadTestingDatabases)([connection])).to.be
            .fulfilled;
    })));
});
//# sourceMappingURL=create-table-with-naming-strategy.js.map