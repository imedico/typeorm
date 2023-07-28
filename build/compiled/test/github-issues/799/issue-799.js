"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const assert = tslib_1.__importStar(require("assert"));
const rimraf_1 = tslib_1.__importDefault(require("rimraf"));
const path_1 = require("path");
const DataSource_1 = require("../../../src/data-source/DataSource");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #799 sqlite: 'database' path should be created", () => {
    let dataSource;
    const path = `${__dirname}/tmp/sqlitedb.db`;
    before(() => (0, rimraf_1.default)((0, path_1.dirname)(path)));
    after(() => (0, rimraf_1.default)((0, path_1.dirname)(path)));
    afterEach(() => {
        if (dataSource && dataSource.isInitialized) {
            dataSource.close();
        }
    });
    it("should create the whole path to database file", async function () {
        // run test only if better-sqlite3 is enabled in ormconfig
        const isEnabled = (0, test_utils_1.getTypeOrmConfig)().some((conf) => conf.type === "sqlite" && conf.skip === false);
        if (isEnabled === false)
            return;
        const dataSource = new DataSource_1.DataSource({
            name: "sqlite",
            type: "sqlite",
            database: path,
        });
        await dataSource.initialize();
        assert.strictEqual(dataSource.isInitialized, true);
    });
    it("should create the whole path to database file for better-sqlite3", async function () {
        // run test only if better-sqlite3 is enabled in ormconfig
        const isEnabled = (0, test_utils_1.getTypeOrmConfig)().some((conf) => conf.type === "better-sqlite3" && conf.skip === false);
        if (isEnabled === false)
            return;
        const dataSource = new DataSource_1.DataSource({
            name: "better-sqlite3",
            type: "better-sqlite3",
            database: path,
        });
        await dataSource.initialize();
        assert.strictEqual(dataSource.isInitialized, true);
    });
});
//# sourceMappingURL=issue-799.js.map