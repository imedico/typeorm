"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issue > #1397 Spaces at the end of values are removed when inserting", () => {
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not trim empty spaces when saving", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = " About My Post   ";
        await connection.manager.save(post);
        post.title.should.be.equal(" About My Post   ");
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.title.should.be.equal(" About My Post   ");
    })));
});
//# sourceMappingURL=issue-1397.js.map