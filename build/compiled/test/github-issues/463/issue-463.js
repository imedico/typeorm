"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #463 saving empty string array", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not return array with single empty string if empty array was saved", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.names = [];
        await connection.getRepository(Post_1.Post).save(post);
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOneBy({ identifier: 1 });
        loadedPost.names.length.should.be.eql(0);
    })));
});
//# sourceMappingURL=issue-463.js.map