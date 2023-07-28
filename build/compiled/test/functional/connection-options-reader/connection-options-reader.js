"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const chai_1 = require("chai");
const ConnectionOptionsReader_1 = require("../../../src/connection/ConnectionOptionsReader");
const path_1 = tslib_1.__importDefault(require("path"));
async function createDotenvFiles() {
    // These files may not always exist
    await fs_1.promises.writeFile(path_1.default.join(__dirname, "configs/.env"), "TYPEORM_CONNECTION = mysql\nTYPEORM_DATABASE = test-env");
    await fs_1.promises.writeFile(path_1.default.join(__dirname, "configs/ormconfig.env"), "TYPEORM_CONNECTION = mysql\nTYPEORM_DATABASE = test-ormconfig-env");
}
describe("ConnectionOptionsReader", () => {
    beforeEach(() => {
        delete process.env["TYPEORM_CONNECTION"];
        delete process.env["TYPEORM_DATABASE"];
    });
    after(() => {
        delete process.env.TYPEORM_CONNECTION;
        delete process.env.TYPEORM_DATABASE;
    });
    it("properly loads config with entities specified", async () => {
        const connectionOptionsReader = new ConnectionOptionsReader_1.ConnectionOptionsReader({
            root: __dirname,
            configName: "configs/class-entities",
        });
        const options = await connectionOptionsReader.get("test-conn");
        (0, chai_1.expect)(options.entities).to.be.an.instanceOf(Array);
        const entities = options.entities;
        (0, chai_1.expect)(entities.length).to.equal(1);
    });
    it("properly loads sqlite in-memory/path config", async () => {
        const connectionOptionsReader = new ConnectionOptionsReader_1.ConnectionOptionsReader({
            root: __dirname,
            configName: "configs/sqlite-memory",
        });
        const inmemoryOptions = await connectionOptionsReader.get("memory");
        (0, chai_1.expect)(inmemoryOptions.database).to.equal(":memory:");
        const fileOptions = await connectionOptionsReader.get("file");
        (0, chai_1.expect)(fileOptions.database).to.have.string("/test");
    });
    it("properly loads config with specified file path", async () => {
        const connectionOptionsReader = new ConnectionOptionsReader_1.ConnectionOptionsReader({
            root: __dirname,
            configName: "configs/test-path-config",
        });
        const fileOptions = await connectionOptionsReader.get("file");
        (0, chai_1.expect)(fileOptions.database).to.have.string("/test-js");
    });
    it("properly loads asynchronous config with specified file path", async () => {
        const connectionOptionsReader = new ConnectionOptionsReader_1.ConnectionOptionsReader({
            root: __dirname,
            configName: "configs/test-path-config-async",
        });
        const fileOptions = await connectionOptionsReader.get("file");
        (0, chai_1.expect)(fileOptions.database).to.have.string("/test-js-async");
    });
    it("properly loads config with specified file path from esm in js", async () => {
        const connectionOptionsReader = new ConnectionOptionsReader_1.ConnectionOptionsReader({
            root: __dirname,
            configName: "configs/test-path-config-esm",
        });
        const fileOptions = await connectionOptionsReader.get("file");
        (0, chai_1.expect)(fileOptions.database).to.have.string("/test-js-esm");
    });
    it("properly loads config from .env file", async () => {
        await createDotenvFiles();
        const connectionOptionsReader = new ConnectionOptionsReader_1.ConnectionOptionsReader({
            root: __dirname,
            configName: "configs/.env",
        });
        const [fileOptions] = await connectionOptionsReader.all();
        (0, chai_1.expect)(fileOptions.database).to.have.string("test-env");
        (0, chai_1.expect)(process.env.TYPEORM_DATABASE).to.equal("test-env");
    });
    it("properly loads config from ormconfig.env file", async () => {
        await createDotenvFiles();
        const connectionOptionsReader = new ConnectionOptionsReader_1.ConnectionOptionsReader({
            root: __dirname,
            configName: "configs/ormconfig.env",
        });
        const [fileOptions] = await connectionOptionsReader.all();
        (0, chai_1.expect)(fileOptions.database).to.have.string("test-ormconfig-env");
        (0, chai_1.expect)(process.env.TYPEORM_DATABASE).to.equal("test-ormconfig-env");
    });
    it("properly loads config ormconfig.env when given multiple choices", async () => {
        await createDotenvFiles();
        const connectionOptionsReader = new ConnectionOptionsReader_1.ConnectionOptionsReader({
            root: path_1.default.join(__dirname, "configs"),
        });
        const [fileOptions] = await connectionOptionsReader.all();
        (0, chai_1.expect)(fileOptions.database).to.have.string("test-ormconfig-env");
        (0, chai_1.expect)(process.env.TYPEORM_DATABASE).to.equal("test-ormconfig-env");
    });
});
//# sourceMappingURL=connection-options-reader.js.map