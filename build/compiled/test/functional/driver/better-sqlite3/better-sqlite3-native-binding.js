"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const path_1 = require("path");
const pathToBetterSqliteNode = (0, path_1.join)(__dirname, "../../../../../../node_modules/better-sqlite3/build/Release/better_sqlite3.node");
describe("option nativeBinding for better-sqlite3", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [],
        enabledDrivers: ["better-sqlite3"],
        driverSpecific: {
            nativeBinding: pathToBetterSqliteNode,
        },
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should use a the path set in nativeBindings to the node file", () => Promise.all(connections.map(async (connection) => {
        (0, chai_1.expect)(connection.driver
            .options.nativeBinding).to.be.eql(pathToBetterSqliteNode);
    })));
});
//# sourceMappingURL=better-sqlite3-native-binding.js.map