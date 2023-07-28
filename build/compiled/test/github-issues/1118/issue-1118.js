"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #1118 findByIds must return empty results if no criteria were passed in an array", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("drivers which does not support offset without limit should throw an exception, other drivers must work fine", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.name = "post #1";
        await connection.manager.save(post);
        await connection.manager
            .findByIds(Post_1.Post, [1])
            .should.eventually.eql([
            {
                id: 1,
                name: "post #1",
            },
        ]);
        await connection.manager
            .findByIds(Post_1.Post, [])
            .should.eventually.eql([]);
    })));
});
//# sourceMappingURL=issue-1118.js.map