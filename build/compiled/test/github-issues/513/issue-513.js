"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const DateUtils_1 = require("../../../src/util/DateUtils");
describe("github issues > #513 Incorrect time/datetime types for SQLite", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "better-sqlite3"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create datetime column type for datetime in sqlite", () => Promise.all(connections.map(async (connection) => {
        const dbColumns = await connection.manager.query("PRAGMA table_info(Post)");
        (0, chai_1.expect)(dbColumns).not.to.be.null;
        (0, chai_1.expect)(dbColumns).not.to.be.undefined;
        let columnType = "";
        dbColumns.map((dbColumn) => {
            if (dbColumn["name"] === "dateTimeColumn") {
                columnType = dbColumn["type"];
            }
        });
        // Expect "datetime" type to translate to SQLite affinity type "DATETIME"
        columnType.should.equal("datetime");
    })));
    it("should persist correct type in datetime column in sqlite", () => Promise.all(connections.map(async (connection) => {
        const now = new Date();
        const post = new Post_1.Post();
        post.id = 1;
        post.dateTimeColumn = now;
        await connection.manager.save(post);
        const storedPost = await connection.manager.findOne(Post_1.Post, {
            where: {
                id: post.id,
            },
        });
        (0, chai_1.expect)(storedPost).to.not.be.null;
        storedPost.dateTimeColumn
            .toDateString()
            .should.equal(now.toDateString());
    })));
    it("should create datetime column type for time in sqlite", () => Promise.all(connections.map(async (connection) => {
        const dbColumns = await connection.manager.query("PRAGMA table_info(Post)");
        (0, chai_1.expect)(dbColumns).not.to.be.null;
        (0, chai_1.expect)(dbColumns).not.to.be.undefined;
        let columnType = "";
        dbColumns.map((dbColumn) => {
            if (dbColumn["name"] === "timeColumn") {
                columnType = dbColumn["type"];
            }
        });
        // Expect "time" type to translate to SQLite type "TEXT"
        columnType.should.equal("time");
    })));
    it("should persist correct type in datetime column in sqlite", () => Promise.all(connections.map(async (connection) => {
        const now = new Date();
        const post = new Post_1.Post();
        post.id = 2;
        post.timeColumn = now; // Should maybe use Date type?
        await connection.manager.save(post);
        const storedPost = await connection.manager.findOne(Post_1.Post, {
            where: {
                id: post.id,
            },
        });
        (0, chai_1.expect)(storedPost).to.not.be.null;
        const expectedTimeString = DateUtils_1.DateUtils.mixedTimeToString(now.getHours() +
            ":" +
            now.getMinutes() +
            ":" +
            now.getSeconds());
        storedPost.timeColumn
            .toString()
            .should.equal(expectedTimeString);
    })));
});
//# sourceMappingURL=issue-513.js.map