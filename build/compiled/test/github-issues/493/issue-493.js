"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #493 pagination should work with string primary keys", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work perfectly with string primary keys", () => Promise.all(connections.map(async (connection) => {
        for (let i = 0; i < 10; i++) {
            const post = new Post_1.Post();
            post.id = "post #" + i;
            post.title = "Hello Post #" + i;
            await connection.manager.save(post);
        }
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .take(5)
            .skip(0)
            .orderBy("post.id")
            .getMany();
        loadedPosts.length.should.be.equal(5);
        loadedPosts[0].id.should.be.equal("post #0");
        loadedPosts[1].id.should.be.equal("post #1");
        loadedPosts[2].id.should.be.equal("post #2");
        loadedPosts[3].id.should.be.equal("post #3");
        loadedPosts[4].id.should.be.equal("post #4");
    })));
});
//# sourceMappingURL=issue-493.js.map