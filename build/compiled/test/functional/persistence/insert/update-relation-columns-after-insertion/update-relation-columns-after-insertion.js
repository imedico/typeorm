"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../../../utils/test-utils");
describe("persistence > insert > update-relation-columns-after-insertion", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work perfectly", () => Promise.all(connections.map(async (connection) => {
        // create category
        const category1 = new Category_1.Category();
        category1.name = "Category saved by cascades #1";
        await connection.manager.save(category1);
        // create post
        const post1 = new Post_1.Post();
        post1.title = "Hello Post #1";
        post1.category = category1;
        await connection.manager.save(post1);
        // todo: HERE FOR CALCULATIONS WE NEED TO CALCULATE OVERALL NUMBER OF QUERIES TO PREVENT EXTRA QUERIES
    })));
});
//# sourceMappingURL=update-relation-columns-after-insertion.js.map