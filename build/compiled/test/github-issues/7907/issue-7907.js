"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #7907 add support for mongodb driver v5", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should find the Post without throw error: Cannot read property 'prototype' of undefined", () => Promise.all(connections.map(async (connection) => {
        const postMongoRepository = connection.getMongoRepository(Post_1.Post);
        // save a post
        const post = new Post_1.Post();
        post.title = "Post";
        post.text = "This is a simple post";
        await postMongoRepository.save(post);
        const findPosts = async () => {
            return postMongoRepository.find();
        };
        const posts = await findPosts();
        (0, chai_1.expect)(findPosts).to.not.throw();
        (0, chai_1.expect)(posts).to.have.lengthOf(1);
        (0, chai_1.expect)(posts[0]).to.be.instanceOf(Post_1.Post);
    })));
});
//# sourceMappingURL=issue-7907.js.map