"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const MssqlParameter_1 = require("../../../src/driver/sqlserver/MssqlParameter");
describe("github issues > #352 double precision round to int in mssql", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mssql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("real number should be successfully stored and loaded from db including value in parameters", () => Promise.all(connections.map(async (connection) => {
        const posts = [];
        for (let i = 1; i <= 25; i++) {
            const post = new Post_1.Post();
            post.id = i + 0.234567789;
            post.title = "hello post";
            posts.push(post);
        }
        await connection.manager.save(posts);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.id = :id", {
            id: new MssqlParameter_1.MssqlParameter(1.234567789, "float"),
        })
            .getOne();
        (0, chai_1.expect)(loadedPost).to.exist;
        (0, chai_1.expect)(loadedPost.id).to.be.equal(1.234567789);
    })));
});
//# sourceMappingURL=issue-352.js.map