"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const path_1 = require("path");
const rimraf_1 = tslib_1.__importDefault(require("rimraf"));
describe("cli init command", () => {
    const cliPath = `${(0, path_1.dirname)((0, path_1.dirname)((0, path_1.dirname)(__dirname)))}/src/cli.js`;
    const databaseOptions = [
        "mysql",
        "mariadb",
        "postgres",
        "cockroachdb",
        "sqlite",
        "better-sqlite3",
        // "oracle", // as always oracle have issues: dependency installation doesn't work on mac m1 due to missing oracle binaries for m1
        "mssql",
        "mongodb",
    ];
    const testProjectName = Date.now() + "TestProject";
    const builtSrcDirectory = "build/compiled/src";
    before(async () => {
        const chmodPromise = new Promise((resolve) => {
            (0, child_process_1.exec)(`chmod 755 ${cliPath}`, (error, stdout, stderr) => {
                (0, chai_1.expect)(error).to.not.exist;
                (0, chai_1.expect)(stderr).to.be.empty;
                resolve();
            });
        });
        const copyPromise = new Promise(async (resolve) => {
            // load package.json from the root of the project
            const packageJson = JSON.parse((0, fs_1.readFileSync)("./package.json", "utf8"));
            packageJson.version = `0.0.0`; // install no version but
            packageJson.installFrom = `file:../${builtSrcDirectory}`; // use the built src directory
            // write the modified package.json to the build directory
            (0, fs_1.writeFileSync)(`./${builtSrcDirectory}/package.json`, JSON.stringify(packageJson, null, 4));
            resolve();
        });
        await Promise.all([chmodPromise, copyPromise]);
    });
    after(async () => {
        await (0, rimraf_1.default)(`./${builtSrcDirectory}/package.json`);
    });
    afterEach(async () => {
        await (0, rimraf_1.default)(`./${testProjectName}`);
    });
    for (const databaseOption of databaseOptions) {
        it(`should work with ${databaseOption} option`, (done) => {
            (0, child_process_1.exec)(`${cliPath} init --name ${testProjectName} --database ${databaseOption}`, (error, stdout, stderr) => {
                if (error)
                    console.log(error);
                (0, chai_1.expect)(error).to.not.exist;
                (0, chai_1.expect)(stderr).to.be.empty;
                done();
            });
        }).timeout(120000);
    }
});
//# sourceMappingURL=issue-8975.js.map