"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const SimplePost_1 = require("./entity/SimplePost");
const SimpleCounters_1 = require("./entity/SimpleCounters");
const Information_1 = require("./entity/Information");
const Post_1 = require("./entity/Post");
describe("columns > embedded columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert / update / remove entity with embedded correctly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(SimplePost_1.SimplePost);
        // save few posts
        const post = new SimplePost_1.SimplePost();
        post.title = "Post";
        post.text = "Everything about post";
        post.counters = new SimpleCounters_1.SimpleCounters();
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
        loadedPost.should.be.instanceOf(SimplePost_1.SimplePost);
        loadedPost.title.should.be.equal("Post");
        loadedPost.text.should.be.equal("Everything about post");
        loadedPost.counters.should.be.instanceOf(SimpleCounters_1.SimpleCounters);
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
        loadedUpdatedPost.should.be.instanceOf(SimplePost_1.SimplePost);
        loadedUpdatedPost.title.should.be.equal("Updated post");
        loadedUpdatedPost.text.should.be.equal("Everything about post");
        loadedUpdatedPost.counters.should.be.instanceOf(SimpleCounters_1.SimpleCounters);
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
    it("should properly generate column names", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const columns = postRepository.metadata.columns;
        const databaseColumns = columns.map((c) => c.databaseName);
        (0, chai_1.expect)(databaseColumns).to.have.members([
            // Post
            // Post.id
            "id",
            // Post.title
            "title",
            // Post.text
            "text",
            // Post.counters()
            // Post.counters().likes
            "countersLikes",
            // Post.counters().comments
            "countersComments",
            // Post.counters().favorites
            "countersFavorites",
            // Post.counters().information('info').description
            "countersInfoDescr",
            // Post.counters().otherCounters('testData').description
            "countersTestDataDescr",
            // Post.counters().dataWithoutPrefix('').description
            "countersDescr",
            // Post.otherCounters('testCounters')
            // Post.otherCounters('testCounters').likes
            "testCountersLikes",
            // Post.otherCounters('testCounters').comments
            "testCountersComments",
            // Post.otherCounters('testCounters').favorites
            "testCountersFavorites",
            // Post.otherCounters('testCounters').information('info').description
            "testCountersInfoDescr",
            // Post.otherCounters('testCounters').data('data').description
            "testCountersTestDataDescr",
            // Post.otherCounters('testCounters').dataWithoutPrefix('').description
            "testCountersDescr",
            // Post.countersWithoutPrefix('')
            // Post.countersWithoutPrefix('').likes
            "likes",
            // Post.countersWithoutPrefix('').comments
            "comments",
            // Post.countersWithoutPrefix('').favorites
            "favorites",
            // Post.countersWithoutPrefix('').information('info').description
            "infoDescr",
            // Post.countersWithoutPrefix('').data('data').description
            "testDataDescr",
            // Post.countersWithoutPrefix('').dataWithoutPrefix('').description
            "descr",
        ]);
    })));
});
//# sourceMappingURL=columns-embedded-columns.js.map