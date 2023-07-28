"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #1233 column updatedDate must appear in the GROUP BY clause or be used in an aggregate function", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should filter correctly using findByIds", () => Promise.all(connections.map(async (connection) => {
        let post1 = new Post_1.Post();
        post1.name = "post #1";
        await connection.manager.save(post1);
        let post2 = new Post_1.Post();
        post2.name = "post #1";
        await connection.manager.save(post2);
        const [loadedPosts, count] = await connection.manager.findAndCount(Post_1.Post, {
            skip: 1,
            take: 1,
        });
        loadedPosts.length.should.be.equal(1);
        loadedPosts[0].id.should.be.equal(1);
        count.should.be.equal(2);
    })));
});
//# sourceMappingURL=issue-1233.js.map