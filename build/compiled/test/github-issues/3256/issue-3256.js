"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #3256 wrong subscriber methods being called", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("if entity was changed, subscriber should be take updated columns", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "hello world";
        await connection.manager.save(post);
        post.inserted.should.be.equal(true);
        post.updated.should.be.equal(false);
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOneById(1);
        loadedPost.title = "updated world";
        await connection.manager.save(loadedPost);
        loadedPost.inserted.should.be.equal(false);
        loadedPost.updated.should.be.equal(true);
    })));
});
//# sourceMappingURL=issue-3256.js.map