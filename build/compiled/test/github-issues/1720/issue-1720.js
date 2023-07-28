"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("github issues > #1720 Listener not invoked when relation loaded through getter", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work as expected", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cat #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "cat #2";
        await connection.manager.save(category2);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        post1.categories = [category1, category2];
        await connection.manager.save(post1);
        const [loadedPost] = await connection.manager.find(Post_1.Post, {
            relations: { categories: true },
        });
        loadedPost.categories[0].loaded.should.be.equal(true);
        loadedPost.categories[1].loaded.should.be.equal(true);
    })));
});
//# sourceMappingURL=issue-1720.js.map