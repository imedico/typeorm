"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
describe("decorators > embedded", () => {
    let connections;
    beforeEach(() => (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post, Counters_1.Counters],
    }).then((all) => (connections = all)));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("basic functionality", function () {
        it("should persist and load entities with embeddeds properly", () => Promise.all(connections.map(async (connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            const post = new Post_1.Post();
            post.title = "Hello post";
            post.text = "This is text about the post";
            post.counters = new Counters_1.Counters();
            post.counters.comments = 5;
            post.counters.favorites = 2;
            post.counters.likes = 1;
            await postRepository.save(post);
            // now load it
            const loadedPost = (await postRepository.findOneBy({
                id: post.id,
            }));
            loadedPost.id.should.be.equal(post.id);
            loadedPost.title.should.be.equal("Hello post");
            loadedPost.text.should.be.equal("This is text about the post");
            loadedPost.counters.should.be.eql({
                comments: 5,
                favorites: 2,
                likes: 1,
            });
        })));
        it("should be used with prop", () => Promise.all(connections.map(async (connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            const post1 = new Post_1.Post();
            post1.title = "Hello post #1";
            post1.text = "This is text about the post";
            post1.counters = new Counters_1.Counters();
            post1.counters.comments = 5;
            post1.counters.favorites = 2;
            post1.counters.likes = 1;
            await postRepository.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "Hello post #2";
            post2.text = "This is text about the post";
            post2.counters = new Counters_1.Counters();
            post2.counters.comments = 6;
            post2.counters.favorites = 1;
            post2.counters.likes = 2;
            await postRepository.save(post2);
            // now load it
            const sortedPosts1 = await postRepository
                .createQueryBuilder("post")
                .orderBy("post.counters.comments", "DESC")
                .getMany();
            sortedPosts1.should.be.eql([
                {
                    id: post2.id,
                    title: "Hello post #2",
                    text: "This is text about the post",
                    counters: {
                        comments: 6,
                        favorites: 1,
                        likes: 2,
                    },
                },
                {
                    id: post1.id,
                    title: "Hello post #1",
                    text: "This is text about the post",
                    counters: {
                        comments: 5,
                        favorites: 2,
                        likes: 1,
                    },
                },
            ]);
            // check another order
            const sortedPosts2 = await postRepository
                .createQueryBuilder("post")
                .orderBy("post.counters.favorites", "DESC")
                .getMany();
            sortedPosts2.should.be.eql([
                {
                    id: post1.id,
                    title: "Hello post #1",
                    text: "This is text about the post",
                    counters: {
                        comments: 5,
                        favorites: 2,
                        likes: 1,
                    },
                },
                {
                    id: post2.id,
                    title: "Hello post #2",
                    text: "This is text about the post",
                    counters: {
                        comments: 6,
                        favorites: 1,
                        likes: 2,
                    },
                },
            ]);
        })));
    });
});
//# sourceMappingURL=query-builder-embedded.js.map