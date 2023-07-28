"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const Image_1 = require("./entity/Image");
describe("query builder > relation-id > one-to-many > basic-functionality", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load id when loadRelationIdAndMap used with OneToMany relation", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "airplanes";
        await connection.manager.save(category3);
        const category4 = new Category_1.Category();
        category4.name = "Boeing";
        await connection.manager.save(category4);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1, category2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.categories = [category3, category4];
        await connection.manager.save(post2);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories")
            .addOrderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[0].categoryIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.contain(1);
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.contain(2);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[1].categoryIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.contain(3);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.contain(4);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories")
            .where("post.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categoryIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[1]).to.be.equal(2);
    })));
    it("should load id when loadRelationIdAndMap used with additional condition", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        category2.isRemoved = true;
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "airplanes";
        await connection.manager.save(category3);
        const category4 = new Category_1.Category();
        category4.name = "Boeing";
        category4.isRemoved = true;
        await connection.manager.save(category4);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1, category2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.categories = [category3, category4];
        await connection.manager.save(post2);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories", "category", (qb) => qb.andWhere("category.isRemoved = :isRemoved", {
            isRemoved: true,
        }))
            .addOrderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[0].categoryIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categoryIds[0]).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[1].categoryIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[1].categoryIds[0]).to.be.equal(4);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories", "category", (qb) => qb.andWhere("category.id = :categoryId", {
            categoryId: 1,
        }))
            .where("post.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categoryIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
    })));
    it("should load id when loadRelationIdAndMap used on nested relation", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.name = "Image #1";
        await connection.manager.save(image1);
        const image2 = new Image_1.Image();
        image2.name = "Image #2";
        await connection.manager.save(image2);
        const image3 = new Image_1.Image();
        image3.name = "Image #3";
        await connection.manager.save(image3);
        const image4 = new Image_1.Image();
        image4.name = "Image #4";
        await connection.manager.save(image4);
        const image5 = new Image_1.Image();
        image5.name = "Image #5";
        await connection.manager.save(image5);
        const category1 = new Category_1.Category();
        category1.name = "cars";
        category1.images = [image1, image2];
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        category2.images = [image3];
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "airplanes";
        category3.images = [image4, image5];
        await connection.manager.save(category3);
        const category4 = new Category_1.Category();
        category4.name = "Boeing";
        await connection.manager.save(category4);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category1, category2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.categories = [category3, category4];
        await connection.manager.save(post2);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories")
            .leftJoinAndSelect("post.categories", "category")
            .loadRelationIdAndMap("category.imageIds", "category.images")
            .orderBy("post.id, category.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[0].categoryIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.contain(1);
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.contain(2);
        (0, chai_1.expect)(loadedPosts[0].categories).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[0].categories.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[0].categories[0].imageIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[0].categories[0].imageIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[0].categories[0].imageIds).to.contain(1);
        (0, chai_1.expect)(loadedPosts[0].categories[0].imageIds).to.contain(2);
        (0, chai_1.expect)(loadedPosts[0].categories[1].imageIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[0].categories[1].imageIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categories[1].imageIds).to.contain(3);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[1].categoryIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.contain(3);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.contain(4);
        (0, chai_1.expect)(loadedPosts[1].categories).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[1].categories.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categories[0].imageIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[1].categories[0].imageIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categories[0].imageIds).to.contain(4);
        (0, chai_1.expect)(loadedPosts[1].categories[0].imageIds).to.contain(5);
        (0, chai_1.expect)(loadedPosts[1].categories[1].imageIds).to.be.eql([]);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories")
            .leftJoinAndSelect("post.categories", "category")
            .loadRelationIdAndMap("category.imageIds", "category.images")
            .where("post.id = :id", { id: 1 })
            .orderBy("category.id")
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categoryIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[1]).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categories.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds[1]).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories[1].imageIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categories[1].imageIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categories[1].imageIds[0]).to.be.equal(3);
    })));
});
//# sourceMappingURL=basic-functionality.js.map