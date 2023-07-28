"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const Image_1 = require("./entity/Image");
describe("query builder > load-relation-count-and-map > many-to-many", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load relation count on owner side", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "Germany";
        await connection.manager.save(category3);
        const category4 = new Category_1.Category();
        category4.name = "airplanes";
        await connection.manager.save(category4);
        const category5 = new Category_1.Category();
        category5.name = "Boeing";
        await connection.manager.save(category5);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1, category2, category3];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Boeing";
        post2.categories = [category4, category5];
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationCountAndMap("post.categoryCount", "post.categories")
            .addOrderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryCount).to.be.equal(3);
        (0, chai_1.expect)(loadedPosts[1].categoryCount).to.be.equal(2);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationCountAndMap("post.categoryCount", "post.categories")
            .where("post.id = :id", { id: post1.id })
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryCount).to.be.equal(3);
    })));
    it("should load relation count on owner side with limitation", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "Germany";
        await connection.manager.save(category3);
        const category4 = new Category_1.Category();
        category4.name = "airplanes";
        await connection.manager.save(category4);
        const category5 = new Category_1.Category();
        category5.name = "Boeing";
        await connection.manager.save(category5);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1, category2, category3];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Boeing";
        post2.categories = [category4, category5];
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "about Audi";
        await connection.manager.save(post3);
        const post4 = new Post_1.Post();
        post4.title = "about Airbus";
        await connection.manager.save(post4);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationCountAndMap("post.categoryCount", "post.categories")
            .orderBy("post.id")
            .offset(0)
            .limit(2)
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryCount).to.be.equal(3);
        (0, chai_1.expect)(loadedPosts[1].categoryCount).to.be.equal(2);
    })));
    it("should load relation count on owner side with additional conditions", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.isRemoved = true;
        image1.name = "image #1";
        await connection.manager.save(image1);
        const image2 = new Image_1.Image();
        image2.name = "image #2";
        await connection.manager.save(image2);
        const image3 = new Image_1.Image();
        image3.name = "image #3";
        await connection.manager.save(image3);
        const category1 = new Category_1.Category();
        category1.name = "cars";
        category1.isRemoved = true;
        category1.images = [image1, image2];
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "Germany";
        await connection.manager.save(category3);
        const category4 = new Category_1.Category();
        category4.name = "airplanes";
        category4.images = [image3];
        await connection.manager.save(category4);
        const category5 = new Category_1.Category();
        category5.name = "Boeing";
        await connection.manager.save(category5);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1, category2, category3];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Boeing";
        post2.categories = [category4, category5];
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .loadRelationCountAndMap("post.categoryCount", "post.categories")
            .loadRelationCountAndMap("post.removedCategoryCount", "post.categories", "rc", (qb) => qb.andWhere("rc.isRemoved = :isRemoved", {
            isRemoved: true,
        }))
            .loadRelationCountAndMap("categories.imageCount", "categories.images", "ic")
            .loadRelationCountAndMap("categories.removedImageCount", "categories.images", "removedImages", (qb) => qb.andWhere("removedImages.isRemoved = :isRemoved", { isRemoved: true }))
            .addOrderBy("post.id, categories.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryCount).to.be.equal(3);
        (0, chai_1.expect)(loadedPosts[0].removedCategoryCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categories[0].imageCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[0].categories[0].removedImageCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categories[1].imageCount).to.be.equal(0);
        (0, chai_1.expect)(loadedPosts[0].categories[2].imageCount).to.be.equal(0);
        (0, chai_1.expect)(loadedPosts[1].categoryCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categories[0].imageCount).to.be.equal(1);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .loadRelationCountAndMap("post.categoryCount", "post.categories")
            .loadRelationCountAndMap("post.removedCategoryCount", "post.categories", "rc", (qb) => qb.andWhere("rc.isRemoved = :isRemoved", {
            isRemoved: true,
        }))
            .loadRelationCountAndMap("categories.imageCount", "categories.images", "ic")
            .loadRelationCountAndMap("categories.removedImageCount", "categories.images", "removedImages", (qb) => qb.andWhere("removedImages.isRemoved = :isRemoved", { isRemoved: true }))
            .where("post.id = :id", { id: post1.id })
            .addOrderBy("post.id, categories.id")
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryCount).to.be.equal(3);
        (0, chai_1.expect)(loadedPost.removedCategoryCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categories[0].imageCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories[0].removedImageCount).to.be.equal(1);
    })));
    it("should load relation count on both sides of relation", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "Germany";
        await connection.manager.save(category3);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1, category2, category3];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.categories = [category1, category3];
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .loadRelationCountAndMap("post.categoryCount", "post.categories")
            .loadRelationCountAndMap("categories.postCount", "categories.posts")
            .addOrderBy("post.id, categories.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryCount).to.be.equal(3);
        (0, chai_1.expect)(loadedPosts[0].categories[0].postCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[0].categories[1].postCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categories[2].postCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categoryCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categories[0].postCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categories[1].postCount).to.be.equal(2);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .loadRelationCountAndMap("post.categoryCount", "post.categories")
            .loadRelationCountAndMap("categories.postCount", "categories.posts")
            .where("post.id = :id", { id: 1 })
            .addOrderBy("post.id, categories.id")
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryCount).to.be.equal(3);
        (0, chai_1.expect)(loadedPost.categories[0].postCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories[1].postCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categories[2].postCount).to.be.equal(2);
    })));
    it("should load relation count on inverse side", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "airplanes";
        await connection.manager.save(category2);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.categories = [category1];
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "about Mercedes";
        post3.categories = [category1];
        await connection.manager.save(post3);
        const post4 = new Post_1.Post();
        post4.title = "about Boeing";
        post4.categories = [category2];
        await connection.manager.save(post4);
        const post5 = new Post_1.Post();
        post5.title = "about Airbus";
        post5.categories = [category2];
        await connection.manager.save(post5);
        let loadedCategories = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationCountAndMap("category.postCount", "category.posts")
            .addOrderBy("category.id")
            .getMany();
        (0, chai_1.expect)(loadedCategories[0].postCount).to.be.equal(3);
        (0, chai_1.expect)(loadedCategories[1].postCount).to.be.equal(2);
        let loadedCategory = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationCountAndMap("category.postCount", "category.posts")
            .where("category.id = :id", { id: category1.id })
            .getOne();
        (0, chai_1.expect)(loadedCategory.postCount).to.be.equal(3);
    })));
    it("should load relation count on inverse side with limitation", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "airplanes";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "BMW";
        await connection.manager.save(category3);
        const category4 = new Category_1.Category();
        category4.name = "Boeing";
        await connection.manager.save(category4);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.categories = [category1];
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "about Mercedes";
        post3.categories = [category1];
        await connection.manager.save(post3);
        const post4 = new Post_1.Post();
        post4.title = "about Boeing";
        post4.categories = [category2];
        await connection.manager.save(post4);
        const post5 = new Post_1.Post();
        post5.title = "about Airbus";
        post5.categories = [category2];
        await connection.manager.save(post5);
        let loadedCategories = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationCountAndMap("category.postCount", "category.posts")
            .orderBy("category.id")
            .offset(0)
            .limit(2)
            .getMany();
        (0, chai_1.expect)(loadedCategories[0].postCount).to.be.equal(3);
        (0, chai_1.expect)(loadedCategories[1].postCount).to.be.equal(2);
    })));
    it("should load relation count on inverse side with additional conditions", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "airplanes";
        await connection.manager.save(category2);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.isRemoved = true;
        post1.categories = [category1];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.isRemoved = true;
        post2.categories = [category1];
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "about Mercedes";
        post3.categories = [category1];
        await connection.manager.save(post3);
        const post4 = new Post_1.Post();
        post4.title = "about Boeing";
        post4.categories = [category2];
        await connection.manager.save(post4);
        const post5 = new Post_1.Post();
        post5.title = "about Airbus";
        post5.categories = [category2];
        await connection.manager.save(post5);
        let loadedCategories = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationCountAndMap("category.postCount", "category.posts")
            .loadRelationCountAndMap("category.removedPostCount", "category.posts", "removedPosts", (qb) => qb.andWhere("removedPosts.isRemoved = :isRemoved", {
            isRemoved: true,
        }))
            .addOrderBy("category.id")
            .getMany();
        (0, chai_1.expect)(loadedCategories[0].postCount).to.be.equal(3);
        (0, chai_1.expect)(loadedCategories[0].removedPostCount).to.be.equal(2);
        (0, chai_1.expect)(loadedCategories[1].postCount).to.be.equal(2);
        let loadedCategory = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationCountAndMap("category.postCount", "category.posts")
            .loadRelationCountAndMap("category.removedPostCount", "category.posts", "removedPosts", (qb) => qb.andWhere("removedPosts.isRemoved = :isRemoved", {
            isRemoved: true,
        }))
            .where("category.id = :id", { id: category1.id })
            .getOne();
        (0, chai_1.expect)(loadedCategory.postCount).to.be.equal(3);
        (0, chai_1.expect)(loadedCategory.removedPostCount).to.be.equal(2);
    })));
});
//# sourceMappingURL=load-relation-count-and-map-many-to-many.js.map