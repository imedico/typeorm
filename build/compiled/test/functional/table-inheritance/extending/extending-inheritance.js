"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("table inheritance > regular inheritance using extends keyword", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work correctly", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.name = "Super title";
        post.text = "About this post";
        await connection.manager.save(post);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        (0, chai_1.expect)(loadedPost.name).not.to.be.undefined;
        (0, chai_1.expect)(loadedPost.text).not.to.be.undefined;
        loadedPost.name.should.be.equal("Super title");
        loadedPost.text.should.be.equal("About this post");
    })));
});
//# sourceMappingURL=extending-inheritance.js.map