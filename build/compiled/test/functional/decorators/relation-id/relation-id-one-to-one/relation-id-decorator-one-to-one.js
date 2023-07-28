"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
describe("decorators > relation-id > one-to-one", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load ids when loadRelationIdAndMap used on owner side", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.id = 1;
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.id = 2;
        category2.name = "airplanes";
        await connection.manager.save(category2);
        const categoryByName1 = new Category_1.Category();
        categoryByName1.id = 3;
        categoryByName1.name = "BMW";
        await connection.manager.save(categoryByName1);
        const categoryByName2 = new Category_1.Category();
        categoryByName2.id = 4;
        categoryByName2.name = "Boeing";
        await connection.manager.save(categoryByName2);
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.title = "about BMW";
        post1.category = category1;
        post1.categoryByName = categoryByName1;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.id = 2;
        post2.title = "about Boeing";
        post2.category = category2;
        post2.categoryByName = categoryByName2;
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .addOrderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].categoryId).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categoryName).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].categoryName).to.be.equal("BMW");
        (0, chai_1.expect)(loadedPosts[1].categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].categoryId).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categoryName).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].categoryName).to.be.equal("Boeing");
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryId).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryName).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryName).to.be.equal("BMW");
    })));
    it("should load id when loadRelationIdAndMap used on inverse side", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.id = 1;
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.id = 2;
        category2.name = "airplanes";
        await connection.manager.save(category2);
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.title = "about BMW";
        post1.category2 = category1;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.id = 2;
        post2.title = "about Boeing";
        post2.category2 = category2;
        await connection.manager.save(post2);
        let loadedCategories = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .addOrderBy("category.id")
            .getMany();
        (0, chai_1.expect)(loadedCategories[0].postId).to.not.be.undefined;
        (0, chai_1.expect)(loadedCategories[0].postId).to.be.equal(1);
        (0, chai_1.expect)(loadedCategories[1].postId).to.not.be.undefined;
        (0, chai_1.expect)(loadedCategories[1].postId).to.be.equal(2);
        let loadedCategory = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .where("category.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedCategory.postId).to.not.be.undefined;
        (0, chai_1.expect)(loadedCategory.postId).to.be.equal(1);
    })));
});
//# sourceMappingURL=relation-id-decorator-one-to-one.js.map