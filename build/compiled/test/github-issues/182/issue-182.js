"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const PostStatus_1 = require("./model/PostStatus");
describe("github issues > #182 enums are not saved properly", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"], // we can properly test lazy-relations only on one platform
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully with enum values", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.status = PostStatus_1.PostStatus.NEW;
        post1.title = "Hello Post #1";
        // persist
        await connection.manager.save(post1);
        const loadedPosts1 = await connection.manager.findOne(Post_1.Post, {
            where: { title: "Hello Post #1" },
        });
        (0, chai_1.expect)(loadedPosts1).not.to.be.null;
        loadedPosts1.should.be.eql({
            id: 1,
            title: "Hello Post #1",
            status: PostStatus_1.PostStatus.NEW,
        });
        // remove persisted
        await connection.manager.remove(post1);
        const post2 = new Post_1.Post();
        post2.status = PostStatus_1.PostStatus.ACTIVE;
        post2.title = "Hello Post #1";
        // persist
        await connection.manager.save(post2);
        const loadedPosts2 = await connection.manager.findOne(Post_1.Post, {
            where: { title: "Hello Post #1" },
        });
        (0, chai_1.expect)(loadedPosts2).not.to.be.null;
        loadedPosts2.should.be.eql({
            id: 2,
            title: "Hello Post #1",
            status: PostStatus_1.PostStatus.ACTIVE,
        });
        // remove persisted
        await connection.manager.remove(post2);
        const post3 = new Post_1.Post();
        post3.status = PostStatus_1.PostStatus.ACHIEVED;
        post3.title = "Hello Post #1";
        // persist
        await connection.manager.save(post3);
        const loadedPosts3 = await connection.manager.findOne(Post_1.Post, {
            where: { title: "Hello Post #1" },
        });
        (0, chai_1.expect)(loadedPosts3).not.to.be.null;
        loadedPosts3.should.be.eql({
            id: 3,
            title: "Hello Post #1",
            status: PostStatus_1.PostStatus.ACHIEVED,
        });
        // remove persisted
        await connection.manager.remove(post3);
    })));
});
//# sourceMappingURL=issue-182.js.map