"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #3395 Transform.from does nothing when column is NULL", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should run transform from if column is null", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.id = 1;
        await connection.getRepository(Post_1.Post).save(post);
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOneById(1);
        loadedPost.text.should.be.eq("This is null");
    })));
});
//# sourceMappingURL=issue-3395.js.map