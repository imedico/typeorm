"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
describe("query builder > relation-id > one-to-one > basic-functionality", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load ids when loadRelationIdAndMap used with OneToOne owner side relation", () => Promise.all(connections.map(async (connection) => {
        const category = new Category_1.Category();
        category.name = "kids";
        await connection.manager.save(category);
        const post = new Post_1.Post();
        post.title = "about kids";
        post.category = category;
        await connection.manager.save(post);
        const category2 = new Category_1.Category();
        category2.name = "cars";
        await connection.manager.save(category2);
        const post2 = new Post_1.Post();
        post2.title = "about cars";
        post2.category = category2;
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryId", "post.category")
            .addOrderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].categoryId).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[1].categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].categoryId).to.be.equal(2);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryId", "post.category")
            .where("post.id = :id", { id: post.id })
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryId).to.be.equal(1);
    })));
    it("should load id when loadRelationIdAndMap used with OneToOne inverse side relation", () => Promise.all(connections.map(async (connection) => {
        const category = new Category_1.Category();
        category.name = "kids";
        await connection.manager.save(category);
        const post = new Post_1.Post();
        post.title = "about kids";
        post.category2 = category;
        await connection.manager.save(post);
        const category2 = new Category_1.Category();
        category2.name = "cars";
        await connection.manager.save(category2);
        const post2 = new Post_1.Post();
        post2.title = "about cars";
        post2.category2 = category2;
        await connection.manager.save(post2);
        let loadedCategories = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationIdAndMap("category.postId", "category.post")
            .addOrderBy("category.id")
            .getMany();
        (0, chai_1.expect)(loadedCategories[0].postId).to.not.be.undefined;
        (0, chai_1.expect)(loadedCategories[0].postId).to.be.equal(1);
        (0, chai_1.expect)(loadedCategories[1].postId).to.not.be.undefined;
        (0, chai_1.expect)(loadedCategories[1].postId).to.be.equal(2);
        let loadedCategory = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationIdAndMap("category.postId", "category.post")
            .where("category.id = 1")
            .getOne();
        (0, chai_1.expect)(loadedCategory.postId).to.not.be.undefined;
        (0, chai_1.expect)(loadedCategory.postId).to.be.equal(1);
    })));
});
//# sourceMappingURL=basic-functionality.js.map