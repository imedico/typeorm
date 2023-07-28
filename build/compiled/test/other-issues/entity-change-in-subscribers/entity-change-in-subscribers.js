"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const PostCategory_1 = require("./entity/PostCategory");
describe("other issues > entity change in subscribers should affect persistence", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("if entity was changed, subscriber should be take updated columns", () => Promise.all(connections.map(async function (connection) {
        const category1 = new PostCategory_1.PostCategory();
        category1.name = "category #1";
        const post = new Post_1.Post();
        post.title = "hello world";
        post.category = category1;
        await connection.manager.save(post);
        // check if it was inserted correctly
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.active.should.be.equal(false);
        // now update some property and let update subscriber trigger
        const category2 = new PostCategory_1.PostCategory();
        category2.name = "category #2";
        loadedPost.category = category2;
        loadedPost.active = true;
        loadedPost.title += "!";
        await connection.manager.save(loadedPost);
        // check if subscriber was triggered and entity was really taken changed columns in the subscriber
        const loadedUpdatedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: post.id,
        });
        (0, chai_1.expect)(loadedUpdatedPost).not.to.be.null;
        (0, chai_1.expect)(loadedUpdatedPost.updatedColumns).to.equals(2);
        (0, chai_1.expect)(loadedUpdatedPost.updatedRelations).to.equals(1);
        await connection.manager.save(loadedPost);
    })));
});
//# sourceMappingURL=entity-change-in-subscribers.js.map