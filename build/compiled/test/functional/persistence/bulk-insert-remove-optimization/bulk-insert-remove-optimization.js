"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/test-setup");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../../utils/test-utils");
describe("persistence > bulk-insert-remove-optimization", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should group multiple insert and remove queries", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.id = 1;
        category1.name = "cat#1";
        const category2 = new Category_1.Category();
        category2.id = 2;
        category2.name = "cat#2";
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "about post";
        post.categories = [category1, category2];
        await connection.manager.save(post);
        await connection.manager.remove([post, category2, category1]);
        // todo: finish test, e.g. check actual queries
    })));
});
//# sourceMappingURL=bulk-insert-remove-optimization.js.map