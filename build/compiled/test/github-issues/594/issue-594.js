"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #594 WhereInIds no longer works in the latest version.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load entities by given simple post ids (non mixed)", () => Promise.all(connections.map(async (connection) => {
        for (let i = 0; i < 10; i++) {
            const post = new Post_1.Post();
            post.modelId = i;
            await connection.manager.save(post);
        }
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .whereInIds([1, 2, 5])
            .getMany();
        loadedPosts.length.should.be.equal(3);
        loadedPosts[0].postId.should.be.equal(1);
        loadedPosts[1].postId.should.be.equal(2);
        loadedPosts[2].postId.should.be.equal(5);
    })));
});
//# sourceMappingURL=issue-594.js.map