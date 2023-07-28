"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("persistence > persistence options > chunks", () => {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should save objects in chunks", () => Promise.all(connections.map(async (connection) => {
        const posts = [];
        for (let i = 0; i < 25000; i++) {
            // CI falls on Node 4 with 100000 rows
            const post = new Post_1.Post();
            post.title = "Bakhrom " + i;
            post.description = "Hello" + i;
            posts.push(post);
        }
        await connection.manager.save(posts, { chunk: 5000 }); // CI falls on Node 4 with 10000 chunks
    })));
});
//# sourceMappingURL=persistence-options-chunks.js.map