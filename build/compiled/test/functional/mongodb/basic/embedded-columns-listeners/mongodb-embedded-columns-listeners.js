"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
const Information_1 = require("./entity/Information");
const chai_1 = require("chai");
const Tags_1 = require("./entity/Tags");
describe("mongodb > embedded columns listeners", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post, Counters_1.Counters, Information_1.Information],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work listeners in entity embeddeds correctly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save posts with embeddeds
        const post = new Post_1.Post();
        post.title = "Post";
        post.text = "Everything about post";
        post.counters = new Counters_1.Counters();
        post.counters.information = new Information_1.Information();
        await postRepository.save(post);
        const loadedPost = await postRepository.findOneBy({
            title: "Post",
        });
        (0, chai_1.expect)(loadedPost).to.be.not.empty;
        (0, chai_1.expect)(loadedPost.counters).to.be.not.empty;
        (0, chai_1.expect)(loadedPost.counters.information).to.be.not.empty;
        loadedPost.should.be.instanceOf(Post_1.Post);
        loadedPost.title.should.be.equal("Post");
        loadedPost.text.should.be.equal("Everything about post");
        post.title = "Updated post";
        await postRepository.save(post);
        const loadedUpdatedPost = await postRepository.findOneBy({
            title: "Updated post",
        });
        (0, chai_1.expect)(loadedUpdatedPost).to.be.not.empty;
        (0, chai_1.expect)(loadedUpdatedPost.counters).to.be.not.empty;
        (0, chai_1.expect)(loadedUpdatedPost.counters.likes).to.be.eq(100);
        (0, chai_1.expect)(loadedUpdatedPost.counters.information.comments).to.be.eq(1);
        (0, chai_1.expect)(loadedUpdatedPost.counters.information.description).to
            .be.not.empty;
        loadedUpdatedPost.should.be.instanceOf(Post_1.Post);
        loadedUpdatedPost.title.should.be.equal("Updated post");
        loadedUpdatedPost.text.should.be.equal("Everything about post");
        await postRepository.remove(post);
    })));
    it("should not work listeners in entity embeddeds if property is optional", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save posts without embeddeds
        const post = new Post_1.Post();
        post.title = "Post";
        post.text = "Everything about post";
        await postRepository.save(post);
        const cursor = postRepository.createCursor();
        const loadedPost = await cursor.next();
        loadedPost.title.should.be.eql("Post");
        loadedPost.text.should.be.eql("Everything about post");
    })));
    it("should work listeners in entity array embeddeds correctly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save posts without embeddeds
        const post = new Post_1.Post();
        post.title = "Post";
        post.text = "Everything about post";
        const tag1 = new Tags_1.Tags();
        tag1.name = "Tag #1";
        const tag2 = new Tags_1.Tags();
        tag2.name = "Tag #2";
        post.tags = [tag1, tag2];
        await postRepository.save(post);
        const cursor = postRepository.createCursor();
        const loadedPost = await cursor.next();
        loadedPost.title.should.be.eql("Post");
        loadedPost.text.should.be.eql("Everything about post");
        (0, chai_1.expect)(loadedPost.tags).to.be.not.empty;
        loadedPost.tags[0].used.should.be.equal(100);
        loadedPost.tags[1].name.should.be.equal("Tag #2");
    })));
});
//# sourceMappingURL=mongodb-embedded-columns-listeners.js.map