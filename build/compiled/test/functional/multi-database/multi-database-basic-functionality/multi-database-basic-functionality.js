"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("../../../utils/test-setup");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Answer_1 = require("./entity/Answer");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const User_1 = require("./entity/User");
const PathUtils_1 = require("../../../../src/util/PathUtils");
const rimraf_1 = tslib_1.__importDefault(require("rimraf"));
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const app_root_path_1 = tslib_1.__importDefault(require("app-root-path"));
const VALID_NAME_REGEX = /^(?!sqlite_).{1,63}$/;
describe("multi-database > basic-functionality", () => {
    describe("filepathToName()", () => {
        for (const platform of [`darwin`, `win32`]) {
            let realPlatform;
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
            it(`produces deterministic, unique, and valid table names for relative paths; leaves absolute paths unchanged (${platform})`, () => {
                const testMap = [
                    ["FILENAME.db", "filename.db"],
                    ["..\\FILENAME.db", "../filename.db"],
                    [
                        "..\\longpathdir\\longpathdir\\longpathdir\\longpathdir\\longpathdir\\longpathdir\\longpathdir\\FILENAME.db",
                        "../longpathdir/longpathdir/longpathdir/longpathdir/longpathdir/longpathdir/longpathdir/filename.db",
                    ],
                    ["C:\\dirFILENAME.db", "C:\\dirFILENAME.db"],
                    ["/dir/filename.db", "/dir/filename.db"],
                ];
                for (const [winOs, otherOs] of testMap) {
                    const winOsRes = (0, PathUtils_1.filepathToName)(winOs);
                    const otherOsRes = (0, PathUtils_1.filepathToName)(otherOs);
                    (0, chai_1.expect)(winOsRes).to.equal(otherOsRes);
                    (0, chai_1.expect)(winOsRes).to.match(VALID_NAME_REGEX, `'${winOs}' is invalid table name`);
                }
            });
        }
    });
    describe("multiple databases", () => {
        let connections;
        const tempPath = path_1.default.resolve(app_root_path_1.default.path, "temp");
        const attachAnswerPath = path_1.default.join(tempPath, "filename-sqlite.attach.db");
        const attachAnswerHandle = (0, PathUtils_1.filepathToName)("filename-sqlite.attach.db");
        const attachCategoryPath = path_1.default.join(tempPath, "./subdir/relative-subdir-sqlite.attach.db");
        const attachCategoryHandle = (0, PathUtils_1.filepathToName)("./subdir/relative-subdir-sqlite.attach.db");
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [Answer_1.Answer, Category_1.Category, Post_1.Post, User_1.User],
                // enabledDrivers: ["sqlite", "better-sqlite3"],
                enabledDrivers: ["sqlite"],
            });
            connections = connections.filter((connection) => connection.name === "sqlite");
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(async () => {
            await (0, test_utils_1.closeTestingConnections)(connections);
            await (0, rimraf_1.default)(`${tempPath}/**/*.attach.db`);
        });
        it("should correctly attach and create database files", () => Promise.all(connections.map(async (connection) => {
            const expectedMainPath = path_1.default.join(tempPath, connections[0].options.database.match(/^.*[\\|\/](?<filename>[^\\|\/]+)$/).groups["filename"]);
            (0, chai_1.expect)(fs_1.default.existsSync(expectedMainPath)).to.be.true;
            (0, chai_1.expect)(fs_1.default.existsSync(attachAnswerPath)).to.be.true;
            (0, chai_1.expect)(fs_1.default.existsSync(attachCategoryPath)).to.be.true;
        })));
        it("should prefix tableName when custom database used in Entity decorator", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const tablePathAnswer = `${attachAnswerHandle}.answer`;
            const table = await queryRunner.getTable(tablePathAnswer);
            await queryRunner.release();
            const answer = new Answer_1.Answer();
            answer.text = "Answer #1";
            await connection.getRepository(Answer_1.Answer).save(answer);
            const sql = connection
                .createQueryBuilder(Answer_1.Answer, "answer")
                .where("answer.id = :id", { id: 1 })
                .getSql();
            sql.should.be.equal(`SELECT "answer"."id" AS "answer_id", "answer"."text" AS "answer_text" FROM "${attachAnswerHandle}"."answer" "answer" WHERE "answer"."id" = 1`);
            table.name.should.be.equal(tablePathAnswer);
        })));
        it("should not affect tableName when using default main database", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const tablePathUser = `user`;
            const table = await queryRunner.getTable(tablePathUser);
            await queryRunner.release();
            const user = new User_1.User();
            user.name = "User #1";
            await connection.getRepository(User_1.User).save(user);
            const sql = connection
                .createQueryBuilder(User_1.User, "user")
                .where("user.id = :id", { id: 1 })
                .getSql();
            sql.should.be.equal(`SELECT "user"."id" AS "user_id", "user"."name" AS "user_name" FROM "user" "user" WHERE "user"."id" = 1`);
            table.name.should.be.equal(tablePathUser);
        })));
        it("should create foreign keys for relations within the same database", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const tablePathCategory = `${attachCategoryHandle}.category`;
            const tablePathPost = `${attachCategoryHandle}.post`;
            const tableCategory = (await queryRunner.getTable(tablePathCategory));
            const tablePost = (await queryRunner.getTable(tablePathPost));
            await queryRunner.release();
            (0, chai_1.expect)(tableCategory.foreignKeys.length).to.eq(1);
            (0, chai_1.expect)(tableCategory.foreignKeys[0].columnNames.length).to.eq(1); // before the fix this was 2, one for each schema
            (0, chai_1.expect)(tableCategory.foreignKeys[0].columnNames[0]).to.eq("postId");
            (0, chai_1.expect)(tablePost.foreignKeys.length).to.eq(0);
        })));
    });
});
//# sourceMappingURL=multi-database-basic-functionality.js.map