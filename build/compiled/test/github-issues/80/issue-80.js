"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #80 repository.save fails when empty array is sent to the method", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully and return persisted entity", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "Hello Post #1";
        const returnedPost = await connection.manager.save(post);
        (0, chai_1.expect)(returnedPost).not.to.be.undefined;
        returnedPost.should.be.equal(post);
    })));
    it("should not fail if empty array is given to persist method", () => Promise.all(connections.map(async (connection) => {
        const posts = [];
        const returnedPosts = await connection.manager.save(posts);
        (0, chai_1.expect)(returnedPosts).not.to.be.undefined;
        returnedPosts.should.be.equal(posts);
    })));
});
//# sourceMappingURL=issue-80.js.map