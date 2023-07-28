"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const chai_1 = require("chai");
describe("github issues > #341 OneToOne relation with referencedColumnName does not work", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("custom join column name and referencedColumnName", () => Promise.all(connections.map(async (connection) => {
        const category = new Category_1.Category();
        category.name = "category #1";
        await connection.manager.save(category);
        const post = new Post_1.Post();
        post.title = "post #1";
        post.category = category;
        await connection.manager.save(post);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.category", "category")
            .getOne();
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        (0, chai_1.expect)(loadedPost.category).not.to.be.undefined;
    })));
});
//# sourceMappingURL=issue-341.js.map