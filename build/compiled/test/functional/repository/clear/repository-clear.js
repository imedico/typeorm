"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("repository > clear method", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should remove everything", () => Promise.all(connections.map(async (connection) => {
        // save dummy data
        for (let i = 0; i < 100; i++) {
            const post = new Post_1.Post();
            post.id = i;
            post.title = "post #" + i;
            await connection.manager.save(post);
        }
        // check if they all are saved
        const loadedPosts = await connection.manager.find(Post_1.Post);
        loadedPosts.should.be.instanceOf(Array);
        loadedPosts.length.should.be.equal(100);
        await connection.getRepository(Post_1.Post).clear();
        // check find method
        const loadedPostsAfterClear = await connection.manager.find(Post_1.Post);
        loadedPostsAfterClear.should.be.instanceOf(Array);
        loadedPostsAfterClear.length.should.be.equal(0);
    })));
    it("called from entity managed should remove everything as well", () => Promise.all(connections.map(async (connection) => {
        // save dummy data
        for (let i = 0; i < 100; i++) {
            const post = new Post_1.Post();
            post.id = i;
            post.title = "post #" + i;
            await connection.manager.save(post);
        }
        // check if they all are saved
        const loadedPosts = await connection.manager.find(Post_1.Post);
        loadedPosts.should.be.instanceOf(Array);
        loadedPosts.length.should.be.equal(100);
        await connection.manager.clear(Post_1.Post);
        // check find method
        const loadedPostsAfterClear = await connection.manager.find(Post_1.Post);
        loadedPostsAfterClear.should.be.instanceOf(Array);
        loadedPostsAfterClear.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=repository-clear.js.map