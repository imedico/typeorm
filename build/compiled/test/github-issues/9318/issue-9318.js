"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const VersionUtils_1 = require("../../../src/util/VersionUtils");
describe("github issues > #9318 Change version query from SHOW server_version to SELECT version", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [],
        schemaCreate: false,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should have proper isGeneratedColumnsSupported value for postgres version", () => Promise.all(connections.map(async (connection) => {
        const { isGeneratedColumnsSupported } = connection.driver;
        const result = await connection.query("SELECT VERSION()");
        const dbVersion = result[0]["version"].replace(/^PostgreSQL ([\d\.]+) .*$/, "$1");
        const versionGreaterOfEqualTo12 = VersionUtils_1.VersionUtils.isGreaterOrEqual(dbVersion, "12.0");
        (0, chai_1.expect)(isGeneratedColumnsSupported).to.eq(versionGreaterOfEqualTo12);
    })));
});
//# sourceMappingURL=issue-9318.js.map