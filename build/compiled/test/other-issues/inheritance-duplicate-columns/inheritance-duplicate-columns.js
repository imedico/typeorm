"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("other issues > double inheritance produces multiple duplicated columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not produce duplicate columns", () => Promise.all(connections.map(async function (connection) {
        // insert a post
        const post = new Post_1.Post();
        post.title = "hello";
        await connection.manager.save(post);
        // check if it was inserted correctly
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.title.should.be.equal("hello");
    })));
});
//# sourceMappingURL=inheritance-duplicate-columns.js.map