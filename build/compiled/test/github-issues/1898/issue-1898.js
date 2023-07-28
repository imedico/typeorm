"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #1898 Simple JSON breaking in @next", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["sqlite", "better-sqlite3"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly persist", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.type = "post";
        await connection.getRepository(Post_1.Post).save(post);
    })));
});
//# sourceMappingURL=issue-1898.js.map