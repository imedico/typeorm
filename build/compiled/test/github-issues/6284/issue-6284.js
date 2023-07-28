"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const fs_1 = require("fs");
const ConnectionOptionsReader_1 = require("../../../src/connection/ConnectionOptionsReader");
const DirectoryExportedClassesLoader_1 = require("../../../src/util/DirectoryExportedClassesLoader");
const LoggerFactory_1 = require("../../../src/logger/LoggerFactory");
describe("github issues > #6284 cli support for cjs extension", () => {
    it("will load a cjs file", async () => {
        const cjsConfigPath = [__dirname, "ormconfig.cjs"].join("/");
        const databaseType = "postgres";
        const config = `module.exports = {"type": "${databaseType}"};`;
        (0, fs_1.writeFileSync)(cjsConfigPath, config);
        const reader = new ConnectionOptionsReader_1.ConnectionOptionsReader({ root: __dirname });
        const results = await reader.all();
        (0, chai_1.expect)(results).to.be.an("Array");
        (0, chai_1.expect)(results[0]).to.be.an("Object");
        (0, chai_1.expect)(results[0].type).to.equal(databaseType);
        (0, fs_1.unlinkSync)(cjsConfigPath);
    });
    it("loads cjs files via DirectoryExportedClassesloader", async () => {
        const klassPath = [__dirname, "klass.cjs"].join("/");
        const klass = `module.exports.Widget = class Widget {};`;
        (0, fs_1.writeFileSync)(klassPath, klass);
        const classes = await (0, DirectoryExportedClassesLoader_1.importClassesFromDirectories)(new LoggerFactory_1.LoggerFactory().create(), [`${__dirname}/*.cjs`]);
        (0, chai_1.expect)(classes).to.be.an("Array");
        (0, chai_1.expect)(classes.length).to.eq(1);
        (0, fs_1.unlinkSync)(klassPath);
    });
});
//# sourceMappingURL=issue-6284.js.map