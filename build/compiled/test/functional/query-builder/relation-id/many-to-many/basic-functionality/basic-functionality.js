"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../../utils/test-utils");
const Tag_1 = require("./entity/Tag");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const Image_1 = require("./entity/Image");
describe("query builder > relation-id > many-to-many > basic-functionality", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not load ids when RelationId decorator is not specified", () => Promise.all(connections.map(async (connection) => {
        const tag = new Tag_1.Tag();
        tag.name = "kids";
        await connection.manager.save(tag);
        const category1 = new Category_1.Category();
        category1.name = "kids";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "future";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "cars";
        await connection.manager.save(category3);
        const post = new Post_1.Post();
        post.title = "about kids";
        post.categories = [category1, category2];
        post.tag = tag;
        await connection.manager.save(post);
        const post2 = new Post_1.Post();
        post2.title = "about BMW";
        post2.categories = [category3];
        post2.tag = tag;
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.tag", "tag")
            .leftJoinAndSelect("post.categories", "categories")
            .addOrderBy("post.id, tag.id, categories.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].tag).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].tagId).to.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].categories).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].tag).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].tagId).to.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].categories).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.be.undefined;
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.tag", "tag")
            .leftJoinAndSelect("post.categories", "categories")
            .addOrderBy("post.id, tag.id, categories.id")
            .where("post.id = :id", { id: post.id })
            .getOne();
        (0, chai_1.expect)(loadedPost.tag).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.tagId).to.be.undefined;
        (0, chai_1.expect)(loadedPost.categories).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categoryIds).to.be.undefined;
    })));
    it("should load ids when loadRelationIdAndMap used on ManyToMany owner side", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "kids";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "future";
        await connection.manager.save(category2);
        const post = new Post_1.Post();
        post.title = "about kids";
        post.categories = [category1, category2];
        await connection.manager.save(post);
        const post2 = new Post_1.Post();
        post2.title = "about kids";
        post2.categories = [category1, category2];
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].categoryIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categoryIds[1]).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categoryIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].categoryIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[1].categoryIds[1]).to.be.equal(2);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories")
            .where("post.id = :id", { id: post.id })
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[1]).to.be.equal(2);
    })));
    it("should load ids when loadRelationIdAndMap used on ManyToMany owner side without inverse side", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "kids";
        const category2 = new Category_1.Category();
        category2.name = "future";
        await connection.manager.save(category1);
        await connection.manager.save(category2);
        const post = new Post_1.Post();
        post.title = "about kids";
        post.subcategories = [category1, category2];
        await connection.manager.save(post);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.subcategories")
            .where("post.id = :id", { id: post.id })
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[1]).to.be.equal(2);
    })));
    it("should load ids when loadRelationIdAndMap used on ManyToMany inverse side", () => Promise.all(connections.map(async (connection) => {
        const category = new Category_1.Category();
        category.name = "cars";
        await connection.manager.save(category);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category];
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.categories = [category];
        await connection.manager.save(post1);
        await connection.manager.save(post2);
        let loadedCategory = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationIdAndMap("category.postIds", "category.posts")
            .where("category.id = :id", { id: category.id })
            .getOne();
        (0, chai_1.expect)(loadedCategory.postIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedCategory.postIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedCategory.postIds[1]).to.be.equal(2);
    })));
    it("should load ids when loadRelationIdAndMap used on ManyToMany owning side with additional condition", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "kids";
        const category2 = new Category_1.Category();
        category2.name = "future";
        await connection.manager.save(category1);
        await connection.manager.save(category2);
        const post = new Post_1.Post();
        post.title = "about kids";
        post.categories = [category1, category2];
        await connection.manager.save(post);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.categories", "categories", (qb) => qb.andWhere("categories.id = :categoryId", {
            categoryId: 1,
        }))
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
    })));
    it("should load ids when loadRelationIdAndMap used on ManyToMany owning side without inverse side and with additional condition", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "kids";
        const category2 = new Category_1.Category();
        category2.name = "future";
        await connection.manager.save(category1);
        await connection.manager.save(category2);
        const post = new Post_1.Post();
        post.title = "about kids";
        post.subcategories = [category1, category2];
        await connection.manager.save(post);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.categoryIds", "post.subcategories", "subCategories", (qb) => qb.andWhere("subCategories.id = :categoryId", {
            categoryId: 1,
        }))
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
    })));
    it("should load ids when loadRelationIdAndMap used on ManyToMany inverse side with additional condition", () => Promise.all(connections.map(async (connection) => {
        const category = new Category_1.Category();
        category.name = "cars";
        await connection.manager.save(category);
        const post1 = new Post_1.Post();
        post1.title = "about BMW";
        post1.categories = [category];
        const post2 = new Post_1.Post();
        post2.title = "about Audi";
        post2.categories = [category];
        await connection.manager.save(post1);
        await connection.manager.save(post2);
        let loadedCategory = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .loadRelationIdAndMap("category.postIds", "category.posts", "posts", (qb) => qb.andWhere("posts.id = :postId", { postId: 1 }))
            .where("category.id = :id", { id: category.id })
            .getOne();
        (0, chai_1.expect)(loadedCategory.postIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedCategory.postIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedCategory.postIds[0]).to.be.equal(1);
    })));
    it("should load ids when loadRelationIdAndMap used on nested relation", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.name = "photo1";
        const image2 = new Image_1.Image();
        image2.name = "photo2";
        await connection.manager.save(image1);
        await connection.manager.save(image2);
        const category1 = new Category_1.Category();
        category1.name = "cars";
        category1.images = [image1, image2];
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        await connection.manager.save(category2);
        const post = new Post_1.Post();
        post.title = "about BMW";
        post.categories = [category1, category2];
        await connection.manager.save(post);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .loadRelationIdAndMap("post.categoryIds", "post.categories")
            .loadRelationIdAndMap("categories.imageIds", "categories.images")
            .where("post.id = :id", { id: post.id })
            .addOrderBy("post.id, categories.id")
            .getOne();
        (0, chai_1.expect)(loadedPost.categories).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[1]).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds.length).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds[1]).to.be.equal(2);
    })));
    it("should load ids when loadRelationIdAndMap used on nested relation with additional conditions", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.name = "photo1";
        const image2 = new Image_1.Image();
        image2.name = "photo2";
        await connection.manager.save(image1);
        await connection.manager.save(image2);
        const category1 = new Category_1.Category();
        category1.name = "cars";
        category1.images = [image1, image2];
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        await connection.manager.save(category2);
        const post = new Post_1.Post();
        post.title = "about BMW";
        post.categories = [category1, category2];
        await connection.manager.save(post);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .loadRelationIdAndMap("post.categoryIds", "post.categories", "categories2", (qb) => qb.andWhere("categories2.id = :categoryId", {
            categoryId: 1,
        }))
            .loadRelationIdAndMap("categories.imageIds", "categories.images", "images", (qb) => qb.andWhere("images.id = :imageId", { imageId: 1 }))
            .where("post.id = :id", { id: post.id })
            .addOrderBy("post.id, categories.id")
            .getOne();
        (0, chai_1.expect)(loadedPost.categories).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categoryIds).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryIds[0]).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds).to.not.be.eql([]);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds.length).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categories[0].imageIds[0]).to.be.equal(1);
    })));
    it("should not load ids of nested relations when loadRelationIdAndMap used on inherit relation and parent relation was not found", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.name = "photo1";
        const image2 = new Image_1.Image();
        image2.name = "photo2";
        await connection.manager.save(image1);
        await connection.manager.save(image2);
        const category1 = new Category_1.Category();
        category1.name = "cars";
        category1.images = [image1, image2];
        await connection.manager.save(category1);
        const post = new Post_1.Post();
        post.title = "about BMW";
        post.categories = [category1];
        await connection.manager.save(post);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories", "categories.id = :categoryId")
            .loadRelationIdAndMap("categories.imageIds", "categories.images")
            .where("post.id = :id", { id: post.id })
            .setParameter("categoryId", 2)
            .addOrderBy("post.id, categories.id")
            .getOne();
        (0, chai_1.expect)(loadedPost.categories).to.be.eql([]);
    })));
});
//# sourceMappingURL=basic-functionality.js.map