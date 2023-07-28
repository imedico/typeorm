"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #1140 timestamp column and value transformer causes TypeError", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("correctly store/load timestamp columns", () => Promise.all(connections.map(async (connection) => {
        const date = new Date();
        date.setMilliseconds(0); // Because some databases don't have millisecond resolution
        const dateNumber = date.getTime();
        const post = new Post_1.Post();
        post.ts = dateNumber;
        await connection.manager.save(post);
        const loadedPosts = await connection.manager.find(Post_1.Post);
        loadedPosts.length.should.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].ts).to.be.equal(dateNumber);
    })));
});
//# sourceMappingURL=issue-1140.js.map