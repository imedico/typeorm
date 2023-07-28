"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #499 postgres DATE hydrated as DATETIME object", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return date in a string format", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "Hello Post #1";
        post.date = "2017-01-25";
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOne(Post_1.Post, {
            where: { title: "Hello Post #1" },
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.date.should.be.equal("2017-01-25");
    })));
});
//# sourceMappingURL=issue-499.js.map