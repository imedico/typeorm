"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const ImportUtils_1 = require("../../../src/util/ImportUtils");
describe("ImportUtils.importOrRequireFile", () => {
    const rmdirSync = (dir) => {
        if (fs_1.default.rmSync != null)
            fs_1.default.rmSync(dir, { recursive: true });
        else
            fs_1.default.rmdirSync(dir, { recursive: true });
    };
    it("should import .js file as ESM", async () => {
        const testDir = path_1.default.join(__dirname, "testJsEsm");
        const srcDir = path_1.default.join(testDir, "src");
        const packageJsonPath = path_1.default.join(testDir, "package.json");
        const packageJsonContent = { type: "module" };
        const jsFilePath = path_1.default.join(srcDir, "file.js");
        const jsFileContent = `
            import path from "path";
            export default function test() {}
            export const number = 6;
        `;
        if (fs_1.default.existsSync(testDir))
            rmdirSync(testDir);
        fs_1.default.mkdirSync(srcDir, { recursive: true });
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent), "utf8");
        fs_1.default.writeFileSync(jsFilePath, jsFileContent, "utf8");
        const [exports, moduleType] = await (0, ImportUtils_1.importOrRequireFile)(jsFilePath);
        (0, chai_1.expect)(exports).to.not.be.eq(null);
        (0, chai_1.expect)(moduleType).to.be.eq("esm");
        (0, chai_1.expect)(exports.default).to.be.a("function");
        (0, chai_1.expect)(exports.number).to.be.eq(6);
        rmdirSync(testDir);
    });
    it("should import .js file as CommonJS", async () => {
        const testDir = path_1.default.join(__dirname, "testJsCommonJs");
        const srcDir = path_1.default.join(testDir, "src");
        const packageJsonPath = path_1.default.join(testDir, "package.json");
        const packageJsonContent = {};
        const jsFilePath = path_1.default.join(srcDir, "file.js");
        const jsFileContent = `
            const path = require("path");
            module.exports = {
                test() {},
                number: 6
            };
        `;
        if (fs_1.default.existsSync(testDir))
            rmdirSync(testDir);
        fs_1.default.mkdirSync(srcDir, { recursive: true });
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJsonContent), "utf8");
        fs_1.default.writeFileSync(jsFilePath, jsFileContent, "utf8");
        const [exports, moduleType] = await (0, ImportUtils_1.importOrRequireFile)(jsFilePath);
        (0, chai_1.expect)(exports).to.not.be.eq(null);
        (0, chai_1.expect)(moduleType).to.be.eq("commonjs");
        (0, chai_1.expect)(exports.test).to.be.a("function");
        (0, chai_1.expect)(exports.number).to.be.eq(6);
        rmdirSync(testDir);
    });
    it("should import .mjs file as ESM", async () => {
        const testDir = path_1.default.join(__dirname, "testMjsEsm");
        const srcDir = path_1.default.join(testDir, "src");
        const jsFilePath = path_1.default.join(srcDir, "file.mjs");
        const jsFileContent = `
            import path from "path";
            export default function test() {}
            export const number = 6;
        `;
        if (fs_1.default.existsSync(testDir))
            rmdirSync(testDir);
        fs_1.default.mkdirSync(srcDir, { recursive: true });
        fs_1.default.writeFileSync(jsFilePath, jsFileContent, "utf8");
        const [exports, moduleType] = await (0, ImportUtils_1.importOrRequireFile)(jsFilePath);
        (0, chai_1.expect)(exports).to.not.be.eq(null);
        (0, chai_1.expect)(moduleType).to.be.eq("esm");
        (0, chai_1.expect)(exports.default).to.be.a("function");
        (0, chai_1.expect)(exports.number).to.be.eq(6);
        rmdirSync(testDir);
    });
    it("should import .cjs file as CommonJS", async () => {
        const testDir = path_1.default.join(__dirname, "testCjsCommonJs");
        const srcDir = path_1.default.join(testDir, "src");
        const jsFilePath = path_1.default.join(srcDir, "file.cjs");
        const jsFileContent = `
            const path = require("path");
            module.exports = {
                test() {},
                number: 6
            };
        `;
        if (fs_1.default.existsSync(testDir))
            rmdirSync(testDir);
        fs_1.default.mkdirSync(srcDir, { recursive: true });
        fs_1.default.writeFileSync(jsFilePath, jsFileContent, "utf8");
        const [exports, moduleType] = await (0, ImportUtils_1.importOrRequireFile)(jsFilePath);
        (0, chai_1.expect)(exports).to.not.be.eq(null);
        (0, chai_1.expect)(moduleType).to.be.eq("commonjs");
        (0, chai_1.expect)(exports.test).to.be.a("function");
        (0, chai_1.expect)(exports.number).to.be.eq(6);
        rmdirSync(testDir);
    });
    it("should import .json file as CommonJS", async () => {
        const testDir = path_1.default.join(__dirname, "testJsonCommonJS");
        const jsonFilePath = path_1.default.join(testDir, "file.json");
        const jsonFileContent = { test: 6 };
        if (fs_1.default.existsSync(testDir))
            rmdirSync(testDir);
        fs_1.default.mkdirSync(testDir, { recursive: true });
        fs_1.default.writeFileSync(jsonFilePath, JSON.stringify(jsonFileContent), "utf8");
        const [exports, moduleType] = await (0, ImportUtils_1.importOrRequireFile)(jsonFilePath);
        (0, chai_1.expect)(exports).to.not.be.eq(null);
        (0, chai_1.expect)(moduleType).to.be.eq("commonjs");
        (0, chai_1.expect)(exports.test).to.be.eq(6);
        rmdirSync(testDir);
    });
});
//# sourceMappingURL=ImportUtils.js.map