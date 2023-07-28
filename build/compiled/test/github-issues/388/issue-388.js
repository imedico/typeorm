"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issues > #388 skip and take with string ID don't work", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load posts with string id successfully", () => Promise.all(connections.map(async (connection) => {
        const posts = [];
        for (let i = 1; i <= 25; i++) {
            const post = new Post_1.Post();
            post.lala_id = "post #" + i;
            post.title = "hello post";
            post.index = i;
            posts.push(post);
        }
        await connection.manager.save(posts);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .skip(5)
            .take(10)
            .orderBy("post.index")
            .getMany();
        (0, chai_1.expect)(loadedPosts).to.length(10);
        (0, chai_1.expect)(loadedPosts[0].lala_id).to.be.equal("post #6");
        (0, chai_1.expect)(loadedPosts[9].lala_id).to.be.equal("post #15");
    })));
});
//# sourceMappingURL=issue-388.js.map