"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
const Information_1 = require("./entity/Information");
const ExtraInformation_1 = require("./entity/ExtraInformation");
const EditHistory_1 = require("./entity/EditHistory");
const chai_1 = require("chai");
describe("mongodb > embedded columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post, Counters_1.Counters, Information_1.Information],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert / update / remove entity with embedded correctly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save few posts
        const post = new Post_1.Post();
        post.title = "Post";
        post.text = "Everything about post";
        post.counters = new Counters_1.Counters();
        post.counters.likes = 5;
        post.counters.comments = 1;
        post.counters.favorites = 10;
        post.counters.information = new Information_1.Information();
        post.counters.information.description = "Hello post";
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
        loadedPost.counters.should.be.instanceOf(Counters_1.Counters);
        loadedPost.counters.likes.should.be.equal(5);
        loadedPost.counters.comments.should.be.equal(1);
        loadedPost.counters.favorites.should.be.equal(10);
        loadedPost.counters.information.should.be.instanceOf(Information_1.Information);
        loadedPost.counters.information.description.should.be.equal("Hello post");
        post.title = "Updated post";
        post.counters.comments = 2;
        post.counters.information.description = "Hello updated post";
        await postRepository.save(post);
        const loadedUpdatedPost = await postRepository.findOneBy({
            title: "Updated post",
        });
        (0, chai_1.expect)(loadedUpdatedPost).to.be.not.empty;
        (0, chai_1.expect)(loadedUpdatedPost.counters).to.be.not.empty;
        (0, chai_1.expect)(loadedUpdatedPost.counters.information).to.be.not.empty;
        loadedUpdatedPost.should.be.instanceOf(Post_1.Post);
        loadedUpdatedPost.title.should.be.equal("Updated post");
        loadedUpdatedPost.text.should.be.equal("Everything about post");
        loadedUpdatedPost.counters.should.be.instanceOf(Counters_1.Counters);
        loadedUpdatedPost.counters.likes.should.be.equal(5);
        loadedUpdatedPost.counters.comments.should.be.equal(2);
        loadedUpdatedPost.counters.favorites.should.be.equal(10);
        loadedUpdatedPost.counters.information.should.be.instanceOf(Information_1.Information);
        loadedUpdatedPost.counters.information.description.should.be.equal("Hello updated post");
        await postRepository.remove(post);
        const removedPost = await postRepository.findOneBy({
            title: "Post",
        });
        const removedUpdatedPost = await postRepository.findOneBy({
            title: "Updated post",
        });
        (0, chai_1.expect)(removedPost).to.be.null;
        (0, chai_1.expect)(removedUpdatedPost).to.be.null;
    })));
    it("should store results in correct camelCase format", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save few posts
        const post = new Post_1.Post();
        post.title = "Post";
        post.text = "Everything about post";
        post.counters = new Counters_1.Counters();
        post.counters.likes = 5;
        post.counters.comments = 1;
        post.counters.favorites = 10;
        post.counters.information = new Information_1.Information();
        post.counters.information.description = "Hello post";
        await postRepository.save(post);
        const cursor = postRepository.createCursor();
        const loadedPost = await cursor.next();
        loadedPost.title.should.be.eql("Post");
        loadedPost.text.should.be.eql("Everything about post");
        loadedPost.counters.likes.should.be.eql(5);
        loadedPost.counters.comments.should.be.eql(1);
        loadedPost.counters.favorites.should.be.eql(10);
        loadedPost.counters.information.description.should.be.eql("Hello post");
    })));
    it("should transform results to correct boolean value", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save few posts
        const post = new Post_1.Post();
        post.title = "Post #1";
        post.text = "Everything about post";
        post.counters = new Counters_1.Counters();
        post.counters.likes = 5;
        post.counters.comments = 0;
        post.counters.favorites = 1;
        post.counters.information = new Information_1.Information();
        post.counters.information.description = "Hello post";
        post.counters.information.editable = false;
        post.counters.information.visible = true;
        await postRepository.save(post);
        const loadedPosts = await postRepository.find();
        loadedPosts[0].counters.comments.should.be.equal(0);
        loadedPosts[0].counters.favorites.should.be.equal(1);
        loadedPosts[0].counters.information.visible.should.be.equal(true);
        loadedPosts[0].counters.information.editable.should.be.equal(false);
    })));
    it("should transform entity with nested embedded columns correctly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save few posts
        const post = new Post_1.Post();
        post.title = "Post #1";
        post.text = "Everything about post";
        post.counters = new Counters_1.Counters();
        post.counters.likes = 5;
        post.counters.comments = 0;
        post.counters.favorites = 1;
        post.counters.information = new Information_1.Information();
        post.counters.information.description = "Hello post";
        post.counters.extraInformation = new ExtraInformation_1.ExtraInformation();
        post.counters.extraInformation.lastEdit = new EditHistory_1.EditHistory();
        post.counters.extraInformation.lastEdit.title = "Old Post Title";
        post.counters.extraInformation.lastEdit.text =
            "Not everything about post";
        await postRepository.save(post);
        const [loadedPost] = await postRepository.find();
        loadedPost.counters.comments.should.be.equal(0);
        loadedPost.counters.favorites.should.be.equal(1);
        loadedPost.counters.extraInformation.lastEdit.title.should.be.eql("Old Post Title");
        loadedPost.counters.extraInformation.lastEdit.text.should.be.eql("Not everything about post");
    })));
});
//# sourceMappingURL=mongodb-embedded-columns.js.map