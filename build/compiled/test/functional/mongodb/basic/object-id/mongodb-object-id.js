"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const PostWithUnderscoreId_1 = require("./entity/PostWithUnderscoreId");
const chai_1 = require("chai");
describe("mongodb > object id columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post, PostWithUnderscoreId_1.PostWithUnderscoreId],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist ObjectIdColumn property as _id to DB", () => Promise.all(connections.map(async (connection) => {
        const postMongoRepository = connection.getMongoRepository(Post_1.Post);
        // save a post
        const post = new Post_1.Post();
        post.title = "Post";
        await postMongoRepository.save(post);
        // little hack to get raw data from mongodb
        const aggArr = await postMongoRepository.aggregate([]).toArray();
        (0, chai_1.expect)(aggArr[0]._id).to.be.not.undefined;
        (0, chai_1.expect)(aggArr[0].nonIdNameOfObjectId).to.be.undefined;
    })));
    it("should map _id to ObjectIdColumn property and remove BD _id property", () => Promise.all(connections.map(async (connection) => {
        const postMongoRepository = connection.getMongoRepository(Post_1.Post);
        // save a post
        const post = new Post_1.Post();
        post.title = "Post";
        await postMongoRepository.save(post);
        (0, chai_1.expect)(post.nonIdNameOfObjectId).to.be.not.undefined;
        (0, chai_1.expect)(post._id).to.be.undefined;
    })));
    it("should save and load properly if objectId property has name _id", () => Promise.all(connections.map(async (connection) => {
        const postMongoRepository = connection.getMongoRepository(PostWithUnderscoreId_1.PostWithUnderscoreId);
        // save a post
        const post = new PostWithUnderscoreId_1.PostWithUnderscoreId();
        post.title = "Post";
        await postMongoRepository.save(post);
        (0, chai_1.expect)(post._id).to.be.not.undefined;
        const loadedPost = await postMongoRepository.findOneBy({
            _id: post._id,
        });
        (0, chai_1.expect)(loadedPost._id).to.be.not.undefined;
    })));
    it("should not persist entity ObjectIdColumn property in DB on update by save", () => Promise.all(connections.map(async (connection) => {
        const postMongoRepository = connection.getMongoRepository(Post_1.Post);
        // save a post
        const post = new Post_1.Post();
        post.title = "Post";
        await postMongoRepository.save(post);
        post.title = "Muhaha changed title";
        await postMongoRepository.save(post);
        (0, chai_1.expect)(post.nonIdNameOfObjectId).to.be.not.undefined;
        (0, chai_1.expect)(post._id).to.be.undefined;
        // little hack to get raw data from mongodb
        const aggArr = await postMongoRepository.aggregate([]).toArray();
        (0, chai_1.expect)(aggArr[0]._id).to.be.not.undefined;
        (0, chai_1.expect)(aggArr[0].nonIdNameOfObjectId).to.be.undefined;
    })));
});
//# sourceMappingURL=mongodb-object-id.js.map