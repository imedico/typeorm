"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const chai_1 = require("chai");
describe("github issues > #996 already loaded via query builder relations should not be loaded again when they are lazily loaded", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"], // only one driver is enabled because this example uses lazy relations
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to find by object reference", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "Category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "Category #2";
        await connection.manager.save(category2);
        const post = new Post_1.Post();
        post.title = "Post #1";
        post.categories = Promise.resolve([category1, category2]);
        await connection.manager.save(post);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .getOne();
        (0, chai_1.expect)(loadedPost).to.not.be.undefined;
        const categories = await loadedPost.categories;
        categories.should.be.eql([
            {
                id: 1,
                name: "Category #1",
            },
            {
                id: 2,
                name: "Category #2",
            },
        ]);
    })));
});
//# sourceMappingURL=issue-996.js.map