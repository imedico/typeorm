"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_root_path_1 = tslib_1.__importDefault(require("app-root-path"));
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const Username_1 = require("./entity/Username");
const PlatformTools_1 = require("../../../src/platform/PlatformTools");
describe("github issues > #4410 allow custom filepath for FileLogger", () => {
    let connections;
    let stub;
    const testingOptions = {
        entities: [Username_1.Username],
        schemaCreate: true,
        dropSchema: true,
    };
    before(() => (stub = sinon_1.default.stub(PlatformTools_1.PlatformTools, "appendFileSync")));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    afterEach(async () => {
        stub.resetHistory();
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
    describe("when no option is passed", () => {
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                ...testingOptions,
                createLogger: () => new src_1.FileLogger("all"),
            });
        });
        it("writes to the base path", async () => Promise.all(connections.map(async (connection) => {
            const testQuery = `SELECT COUNT(*) FROM ${connection.driver.escape("username")}`;
            await connection.query(testQuery);
            sinon_1.default.assert.calledWith(stub, app_root_path_1.default.path + "/ormlogs.log", sinon_1.default.match(testQuery));
        })));
    });
    describe("when logPath option is passed as a file", () => {
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                ...testingOptions,
                createLogger: () => new src_1.FileLogger("all", {
                    logPath: "test.log",
                }),
            });
        });
        it("writes to the given filename", async () => Promise.all(connections.map(async (connection) => {
            const testQuery = `SELECT COUNT(*) FROM ${connection.driver.escape("username")}`;
            await connection.query(testQuery);
            sinon_1.default.assert.calledWith(stub, app_root_path_1.default.path + "/test.log", sinon_1.default.match(testQuery));
        })));
    });
    describe("when logPath option is passed as a nested path", () => {
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                ...testingOptions,
                createLogger: () => new src_1.FileLogger("all", {
                    logPath: "./test/test.log",
                }),
            });
        });
        it("writes to the given path", () => Promise.all(connections.map(async (connection) => {
            const testQuery = `SELECT COUNT(*) FROM ${connection.driver.escape("username")}`;
            await connection.query(testQuery);
            sinon_1.default.assert.calledWith(stub, app_root_path_1.default.path + "/test/test.log", sinon_1.default.match(testQuery));
        })));
    });
});
//# sourceMappingURL=issue-4410.js.map