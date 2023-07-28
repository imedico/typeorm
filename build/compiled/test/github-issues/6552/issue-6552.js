"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("../../utils/test-setup");
const PlatformTools_1 = require("../../../src/platform/PlatformTools");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const PostV2_1 = require("./entity/PostV2");
describe("github issues > #6552 MongoRepository delete by ObjectId deletes the wrong entity", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // before the fix this would delete incorrectly post1 instead of post2
    it("should delete the correct entity when id column is called _id", () => Promise.all(connections.map(async function (connection) {
        // setup: create 2 posts
        const post1 = new Post_1.Post();
        post1.title = "Post 1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Post 2";
        await connection.manager.save(post2);
        const objectIdInstance = PlatformTools_1.PlatformTools.load("mongodb").ObjectId;
        // double check that post2._id is actually an ObjectId
        (0, chai_1.expect)(post2._id).to.be.not.null;
        (0, chai_1.expect)(post2._id).to.be.not.undefined;
        (0, chai_1.expect)(post2._id).to.be.instanceof(objectIdInstance);
        // delete Post 2 by ObjectId directly
        await connection.manager.delete(Post_1.Post, post2._id);
        // This used to wrongly perform deleteOne({}) - deleting the first Post in the collection
        // Post 1 should remain in the DB
        const count1 = await connection.manager.countBy(Post_1.Post, {
            _id: post1._id,
        });
        (0, chai_1.expect)(count1).to.be.equal(1, "Post 1 should still exist");
        // Post 2 should be deleted
        const count2 = await connection.manager.countBy(Post_1.Post, {
            _id: post2._id,
        });
        (0, chai_1.expect)(count2).to.be.equal(0, "Post 2 should be deleted");
    })));
    // before the fix this wouldn't delete anything
    it("should delete the correct entity when id column is not called _id", () => Promise.all(connections.map(async function (connection) {
        const postV2Repository = connection.getMongoRepository(PostV2_1.PostV2);
        // setup: create 2 posts
        const post1 = new PostV2_1.PostV2();
        post1.title = "Post 1";
        await postV2Repository.save(post1);
        const post2 = new PostV2_1.PostV2();
        post2.title = "Post 2";
        await postV2Repository.save(post2);
        const objectIdInstance = PlatformTools_1.PlatformTools.load("mongodb").ObjectId;
        // double check that post2.postId is actually an ObjectId
        (0, chai_1.expect)(post2.postId).to.be.not.null;
        (0, chai_1.expect)(post2.postId).to.be.not.undefined;
        (0, chai_1.expect)(post2.postId).to.be.instanceof(objectIdInstance);
        // delete Post 2 by ObjectId directly
        await postV2Repository.delete(post2.postId);
        // This used to wrongly perform deleteOne({_id: Buffer}) - not deleting anything because Buffer is not an ObjectId
        // Post 1 should remain in the DB
        const count1 = await postV2Repository.countBy({
            _id: post1.postId,
        });
        (0, chai_1.expect)(count1).to.be.equal(1, "Post 1 should still exist");
        // Post 2 should be deleted
        const count2 = await postV2Repository.countBy({
            _id: post2.postId,
        });
        (0, chai_1.expect)(count2).to.be.equal(0, "Post 2 should be deleted");
    })));
    // before the fix this passed (added here to make sure we don't cause any regressions)
    it("should delete the correct entity when deleting by _id query", () => Promise.all(connections.map(async function (connection) {
        // setup: create 2 posts
        const post1 = new Post_1.Post();
        post1.title = "Post 1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "Post 2";
        await connection.manager.save(post2);
        const objectIdInstance = PlatformTools_1.PlatformTools.load("mongodb").ObjectId;
        // double check that post2._id is actually an ObjectId
        (0, chai_1.expect)(post2._id).to.be.not.null;
        (0, chai_1.expect)(post2._id).to.be.not.undefined;
        (0, chai_1.expect)(post2._id).to.be.instanceof(objectIdInstance);
        // delete Post 2 by ObjectId directly
        await connection.manager.delete(Post_1.Post, { _id: post2._id });
        // Post 1 should remain in the DB
        const count1 = await connection.manager.countBy(Post_1.Post, {
            _id: post1._id,
        });
        (0, chai_1.expect)(count1).to.be.equal(1, "Post 1 should still exist");
        // Post 2 should be deleted
        const count2 = await connection.manager.countBy(Post_1.Post, {
            _id: post2._id,
        });
        (0, chai_1.expect)(count2).to.be.equal(0, "Post 2 should be deleted");
    })));
});
//# sourceMappingURL=issue-6552.js.map