"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #2065 TypeError: Cannot convert object to primitive value", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save an entity created with Object.create(null)", () => Promise.all(connections.map(async (connection) => {
        const post = Object.create(null);
        post.id = 1;
        post.title = "Hello Post";
        await connection.manager.save(Post_1.Post, post);
    })));
});
//# sourceMappingURL=issue-2065.js.map