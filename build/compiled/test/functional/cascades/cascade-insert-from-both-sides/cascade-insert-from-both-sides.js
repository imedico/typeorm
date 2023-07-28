"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const PostDetails_1 = require("./entity/PostDetails");
describe("cascades > should insert by cascades from both sides (#57)", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert by cascades from owner side", () => Promise.all(connections.map(async (connection) => {
        // first create details but don't save them because they will be saved by cascades
        const details = new PostDetails_1.PostDetails();
        details.keyword = "post-1";
        // then create and save a post with details
        const post1 = new Post_1.Post();
        post1.title = "Hello Post #1";
        post1.details = details;
        await connection.manager.save(post1);
        // now check
        const posts = await connection.manager.find(Post_1.Post, {
            join: {
                alias: "post",
                innerJoinAndSelect: {
                    details: "post.details",
                },
            },
        });
        posts.should.be.eql([
            {
                key: post1.key,
                title: post1.title,
                details: {
                    keyword: "post-1",
                },
            },
        ]);
    })));
});
//# sourceMappingURL=cascade-insert-from-both-sides.js.map