"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #211 where in query issue", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not fail if WHERE IN expression is used", () => Promise.all(connections.map(async (connection) => {
        for (let i = 0; i < 10; i++) {
            const post1 = new Post_1.Post();
            post1.title = "post #" + i;
            post1.text = "about post";
            await connection.manager.save(post1);
        }
        const loadedPosts1 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.id IN (:...ids)", { ids: [1, 2, 3] })
            .getMany();
        loadedPosts1.length.should.be.equal(3);
        const loadedPosts2 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.text = :text", { text: "about post" })
            .andWhere("post.title IN (:...titles)", {
            titles: ["post #1", "post #2", "post #3"],
        })
            .getMany();
        loadedPosts2.length.should.be.equal(3);
    })));
});
//# sourceMappingURL=issue-211.js.map