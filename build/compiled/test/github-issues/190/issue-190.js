"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #190 too many SQL variables when using setMaxResults in SQLite", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "better-sqlite3"], // this issue only related to sqlite
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not fail if high max results is used", () => Promise.all(connections.map(async (connection) => {
        for (let i = 0; i < 1000; i++) {
            const post1 = new Post_1.Post();
            post1.title = "Hello Post #1";
            await connection.manager.save(post1);
        }
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .take(1000)
            .getMany();
        loadedPosts.length.should.be.equal(1000);
    })));
});
//# sourceMappingURL=issue-190.js.map