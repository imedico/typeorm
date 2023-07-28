"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathUtils_1 = require("../../src/util/PathUtils");
const chai_1 = require("chai");
describe(`path-utils`, () => {
    describe("isAbsolute", () => {
        it("discriminates cross platform relative paths", () => {
            const testMap = [
                ["FILENAME.db", false],
                ["./FILENAME.db", false],
                [".FILENAME.db", false],
                ["path/FILENAME.db", false],
                ["pathFILENAME.db", false],
                ["..FILENAME.db", false],
                ["../filename.db", false],
                ["C:\\dirFILENAME.db", true],
                ["/dir/filename.db", true],
            ];
            for (const [aPath, expected] of testMap) {
                (0, chai_1.expect)((0, PathUtils_1.isAbsolute)(aPath), `${aPath} did not match ${expected}`).to.equal(expected);
            }
        });
    });
    describe("toPortablePath", () => {
        for (const platform of [`darwin`, `win32`]) {
            let realPlatform;
            describe(`Platform ${platform}`, () => {
                beforeEach(() => {
                    realPlatform = process.platform;
                    Object.defineProperty(process, `platform`, {
                        configurable: true,
                        value: platform,
                    });
                });
                afterEach(() => {
                    Object.defineProperty(process, `platform`, {
                        configurable: true,
                        value: realPlatform,
                    });
                });
                describe(`toPortablePath`, () => {
                    if (platform !== `win32`) {
                        it(`should change paths on non-Windows platform`, () => {
                            const inputPath = `C:\\Users\\user\\proj`;
                            const outputPath = inputPath;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                    }
                    else {
                        it(`shouldn't change absolute posix paths when producing portable path`, () => {
                            const inputPath = `/home/user/proj`;
                            const outputPath = inputPath;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`shouldn't change absolute paths that are already portable`, () => {
                            const inputPath = `/c:/Users/user/proj`;
                            const outputPath = `/c:/Users/user/proj`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should normalize the slashes in relative Windows paths`, () => {
                            const inputPath = `..\\Users\\user/proj`;
                            const outputPath = `../Users/user/proj`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should transform Windows paths into their posix counterparts (uppercase drive)`, () => {
                            const inputPath = `C:\\Users\\user\\proj`;
                            const outputPath = `/C:/Users/user/proj`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should transform Windows paths into their posix counterparts (lowercase drive)`, () => {
                            const inputPath = `c:\\Users\\user\\proj`;
                            const outputPath = `/c:/Users/user/proj`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should transform Windows paths into their posix counterparts (forward slashes)`, () => {
                            const inputPath = `C:/Users/user/proj`;
                            const outputPath = `/C:/Users/user/proj`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should support Windows paths that contain both backslashes and forward slashes`, () => {
                            const inputPath = `C:/Users\\user/proj`;
                            const outputPath = `/C:/Users/user/proj`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should support drive: Windows paths`, () => {
                            const inputPath = `C:`;
                            const outputPath = `/C:`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should support UNC Windows paths (\\\\[server]\\[sharename]\\)`, () => {
                            const inputPath = `\\\\Server01\\user\\docs\\Letter.txt`;
                            const outputPath = `/unc/Server01/user/docs/Letter.txt`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should support Long UNC Windows paths (\\\\?\\[server]\\[sharename]\\)`, () => {
                            const inputPath = `\\\\?\\Server01\\user\\docs\\Letter.txt`;
                            const outputPath = `/unc/?/Server01/user/docs/Letter.txt`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should support Long UNC Windows paths (\\\\?\\UNC\\[server]\\[sharename]\\)`, () => {
                            const inputPath = `\\\\?\\UNC\\Server01\\user\\docs\\Letter.txt`;
                            const outputPath = `/unc/?/UNC/Server01/user/docs/Letter.txt`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should support Long UNC Windows paths (\\\\?\\[drive_spec]:\\)`, () => {
                            const inputPath = `\\\\?\\C:\\user\\docs\\Letter.txt`;
                            const outputPath = `/unc/?/C:/user/docs/Letter.txt`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                        it(`should support Long UNC Windows paths with dot (\\\\.\\[physical_device]\\)`, () => {
                            const inputPath = `\\\\.\\PhysicalDevice\\user\\docs\\Letter.txt`;
                            const outputPath = `/unc/.dot/PhysicalDevice/user/docs/Letter.txt`;
                            (0, chai_1.expect)((0, PathUtils_1.toPortablePath)(inputPath)).to.equal(outputPath);
                        });
                    }
                });
            });
        }
    });
});
//# sourceMappingURL=path-utils.js.map