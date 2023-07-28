"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const VersionUtils_1 = require("../../../src/util/VersionUtils");
describe("github issues > #4782 mariadb driver wants to recreate create/update date columns CURRENT_TIMESTAMP(6) === current_timestamp(6)", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        // logging: true,
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql", "mariadb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not want to execute migrations twice", () => Promise.all(connections.map(async (connection) => {
        const sql1 = await connection.driver.createSchemaBuilder().log();
        (0, chai_1.expect)(sql1.upQueries).to.eql([]);
    })));
    describe("VersionUtils", () => {
        describe("isGreaterOrEqual", () => {
            it("should return false when comparing invalid versions", () => {
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("", "")).to.equal(false);
            });
            it("should return false when targetVersion is larger", () => {
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "1.2.4")).to.equal(false);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "1.4.3")).to.equal(false);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "2.2.3")).to.equal(false);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2", "1.3")).to.equal(false);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1", "2")).to.equal(false);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual(undefined, "0.0.1")).to.equal(false);
            });
            it("should return true when targetVersion is smaller", () => {
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "1.2.2")).to.equal(true);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "1.1.3")).to.equal(true);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2.3", "0.2.3")).to.equal(true);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1.2", "1.2")).to.equal(true);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("1", "1")).to.equal(true);
            });
            it("should work with mariadb-style versions", () => {
                const dbVersion = "10.4.8-MariaDB-1:10.4.8+maria~bionic";
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("10.4.9", dbVersion)).to.equal(true);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("10.4.8", dbVersion)).to.equal(true);
                (0, chai_1.expect)(VersionUtils_1.VersionUtils.isGreaterOrEqual("10.4.7", dbVersion)).to.equal(false);
            });
        });
    });
});
//# sourceMappingURL=issue-4782.js.map