"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("driver > convert raw results to entity", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return null value in entity property when record column is null", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.id = 1;
        await postRepository.save(post);
        const loadedPost = await postRepository.findOneBy({ id: 1 });
        if (loadedPost) {
            (0, chai_1.expect)(loadedPost.isNew).to.be.equal(null);
        }
    })));
    it("should return true in entity property when record column is true", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.id = 1;
        post.isNew = true;
        await postRepository.save(post);
        const loadedPost = await postRepository.findOneBy({ id: 1 });
        if (loadedPost) {
            (0, chai_1.expect)(loadedPost.isNew).to.be.equal(true);
        }
    })));
    it("should return false in entity property when record column is false", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.id = 1;
        post.isNew = false;
        await postRepository.save(post);
        const loadedPost = await postRepository.findOneBy({ id: 1 });
        if (loadedPost) {
            (0, chai_1.expect)(loadedPost.isNew).to.be.equal(false);
        }
    })));
});
//# sourceMappingURL=convert-to-entity.js.map