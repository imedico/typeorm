"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe.skip("github issues > #1147 FindOptions should be able to accept custom where condition", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should properly query using custom sql", () => Promise.all(connections.map(async (connection) => {
        for (let i = 1; i <= 5; i++) {
            const post1 = new Post_1.Post();
            post1.title = `post ${i}`;
            await connection.manager.save(post1);
        }
        // this test is not valid anymore, because functionality behind it was removed
        // const posts = await connection.manager.find(Post, { where: "Post.title LIKE '%3'" });
        // posts.length.should.be.equal(1);
        // expect(posts[0].title).to.be.equal("post 3");
    })));
});
//# sourceMappingURL=issue-1147.js.map