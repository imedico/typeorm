"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
const test_utils_1 = require("../../../utils/test-utils");
describe("embedded > prefix functionality", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert, load, update and remove entities with embeddeds properly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Hello post";
        post.text = "This is text about the post";
        post.counters = new Counters_1.Counters();
        post.counters.comments = 5;
        post.counters.favorites = 2;
        post.counters.likes = 1;
        await postRepository.save(post);
        // now load it
        const loadedPost = (await postRepository.findOneBy({ id: 1 }));
        loadedPost.id.should.be.equal(1);
        loadedPost.title.should.be.equal("Hello post");
        loadedPost.text.should.be.equal("This is text about the post");
        loadedPost.counters.should.be.eql({
            comments: 5,
            favorites: 2,
            likes: 1,
        });
    })));
});
//# sourceMappingURL=embedded-prefix.js.map