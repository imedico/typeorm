"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("other issues > entity change in listeners should affect persistence", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("if entity was changed in the listener, changed property should be updated in the db", () => Promise.all(connections.map(async function (connection) {
        // insert a post
        const post = new Post_1.Post();
        post.title = "hello";
        await connection.manager.save(post);
        // check if it was inserted correctly
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.title.should.be.equal("hello");
        // now update some property and let update listener trigger
        loadedPost.active = true;
        await connection.manager.save(loadedPost);
        // check if update listener was triggered and entity was really updated by the changes in the listener
        const loadedUpdatedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedUpdatedPost).not.to.be.null;
        loadedUpdatedPost.title.should.be.equal("hello!");
        await connection.manager.save(loadedPost);
        await connection.manager.save(loadedPost);
        await connection.manager.save(loadedPost);
        await connection.manager.save(loadedPost);
    })));
});
//# sourceMappingURL=entity-change-in-listeners.js.map