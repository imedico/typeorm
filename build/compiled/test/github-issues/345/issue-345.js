"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const chai_1 = require("chai");
describe("github issues > #345 Join query on ManyToMany relations not working", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("embedded with custom column name should persist and load without errors", () => Promise.all(connections.map(async (connection) => {
        for (let i = 0; i < 20; i++) {
            const category = new Category_1.Category();
            category.name = "Category #" + i;
            await connection.manager.save(category);
        }
        const post = new Post_1.Post();
        post.title = "SuperRace";
        post.categories = [new Category_1.Category()];
        post.categories[0].name = "SuperCategory";
        await connection.manager.save(post);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "category")
            .where("category.category_id IN (:...ids)", { ids: [21] })
            .getOne();
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        (0, chai_1.expect)(loadedPost.categories).not.to.be.undefined;
    })));
});
//# sourceMappingURL=issue-345.js.map