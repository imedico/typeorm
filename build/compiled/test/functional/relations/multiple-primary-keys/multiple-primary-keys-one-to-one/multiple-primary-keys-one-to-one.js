"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const Tag_1 = require("./entity/Tag");
describe("relations > multiple-primary-keys > one-to-one", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("owning side", () => {
        it("should load related entity when JoinColumn is specified without options", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            await connection.manager.save(category2);
            const post1 = new Post_1.Post();
            post1.title = "About cars #1";
            post1.category = category1;
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About cars #2";
            post2.category = category2;
            await connection.manager.save(post2);
            const loadedPosts = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.category", "category")
                .orderBy("post.id")
                .getMany();
            (0, chai_1.expect)(loadedPosts[0].category).to.not.be.undefined;
            (0, chai_1.expect)(loadedPosts[0].category.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPosts[0].category.type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedPosts[1].category).to.not.be.undefined;
            (0, chai_1.expect)(loadedPosts[1].category.name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedPosts[1].category.type).to.be.equal("common-category");
            const loadedPost = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.category", "category")
                .where("post.id = :id", { id: 1 })
                .getOne();
            (0, chai_1.expect)(loadedPost.category).to.not.be.undefined;
            (0, chai_1.expect)(loadedPost.category.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPost.category.type).to.be.equal("common-category");
        })));
        it("should load related entity when JoinColumn is specified with options", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            await connection.manager.save(category2);
            const post1 = new Post_1.Post();
            post1.title = "About cars #1";
            post1.categoryWithOptions = category1;
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About cars #2";
            post2.categoryWithOptions = category2;
            await connection.manager.save(post2);
            const loadedPosts = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoryWithOptions", "category")
                .orderBy("post.id")
                .getMany();
            (0, chai_1.expect)(loadedPosts[0].categoryWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[0].categoryWithOptions.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPosts[0].categoryWithOptions.type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedPosts[1].categoryWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[1].categoryWithOptions.name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedPosts[1].categoryWithOptions.type).to.be.equal("common-category");
            const loadedPost = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoryWithOptions", "category")
                .where("post.id = :id", { id: 1 })
                .getOne();
            (0, chai_1.expect)(loadedPost.categoryWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPost.categoryWithOptions.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPost.categoryWithOptions.type).to.be.equal("common-category");
        })));
        it("should load related entity when JoinColumn references on to non-primary columns", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.description = "category about cars";
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.description = "category about airplanes";
            await connection.manager.save(category2);
            const post1 = new Post_1.Post();
            post1.title = "About cars #1";
            post1.categoryWithNonPKColumns = category1;
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About cars #2";
            post2.categoryWithNonPKColumns = category2;
            await connection.manager.save(post2);
            const loadedPosts = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoryWithNonPKColumns", "category")
                .orderBy("post.id")
                .getMany();
            (0, chai_1.expect)(loadedPosts[0].categoryWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[0].categoryWithNonPKColumns.code).to.be.equal(1);
            (0, chai_1.expect)(loadedPosts[0].categoryWithNonPKColumns.version).to.be.equal(1);
            (0, chai_1.expect)(loadedPosts[0].categoryWithNonPKColumns.description).to.be.equal("category about cars");
            (0, chai_1.expect)(loadedPosts[1].categoryWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[1].categoryWithNonPKColumns.code).to.be.equal(2);
            (0, chai_1.expect)(loadedPosts[1].categoryWithNonPKColumns.version).to.be.equal(1);
            const loadedPost = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoryWithNonPKColumns", "category")
                .where("post.id = :id", { id: 1 })
                .getOne();
            (0, chai_1.expect)(loadedPost.categoryWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPost.categoryWithNonPKColumns.code).to.be.equal(1);
            (0, chai_1.expect)(loadedPost.categoryWithNonPKColumns.version).to.be.equal(1);
            (0, chai_1.expect)(loadedPost.categoryWithNonPKColumns.description).to.be.equal("category about cars");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinColumn defined without options", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            await connection.manager.save(category2);
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            tag1.category = category1;
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 3;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            tag2.category = category2;
            await connection.manager.save(tag2);
            const loadedTags = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.category", "category")
                .orderBy("tag.code, category.code")
                .getMany();
            (0, chai_1.expect)(loadedTags[0].category).to.not.be.undefined;
            (0, chai_1.expect)(loadedTags[0].category.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTags[0].category.type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedTags[1].category).to.not.be.undefined;
            (0, chai_1.expect)(loadedTags[1].category.name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedTags[1].category.type).to.be.equal("common-category");
            const loadedTag = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.category", "category")
                .orderBy("category.code")
                .where("tag.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedTag.category).to.not.be.undefined;
            (0, chai_1.expect)(loadedTag.category.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTag.category.type).to.be.equal("common-category");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinColumn defined with options", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            await connection.manager.save(category2);
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            tag1.categoryWithOptions = category1;
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 3;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            tag2.categoryWithOptions = category2;
            await connection.manager.save(tag2);
            const loadedTags = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categoryWithOptions", "category")
                .orderBy("tag.code, category.code")
                .getMany();
            (0, chai_1.expect)(loadedTags[0].categoryWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[0].categoryWithOptions.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTags[0].categoryWithOptions.type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedTags[1].categoryWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[1].categoryWithOptions.name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedTags[1].categoryWithOptions.type).to.be.equal("common-category");
            const loadedTag = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categoryWithOptions", "category")
                .orderBy("category.code")
                .where("tag.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedTag.categoryWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTag.categoryWithOptions.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTag.categoryWithOptions.type).to.be.equal("common-category");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinColumn references on to non-primary columns", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.description = "category of cars";
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.description = "category of airplanes";
            await connection.manager.save(category2);
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            tag1.categoryWithNonPKColumns = category1;
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 3;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            tag2.categoryWithNonPKColumns = category2;
            await connection.manager.save(tag2);
            const loadedTags = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categoryWithNonPKColumns", "category")
                .orderBy("tag.code, category.code")
                .getMany();
            (0, chai_1.expect)(loadedTags[0].categoryWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[0].categoryWithNonPKColumns.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTags[0].categoryWithNonPKColumns.type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedTags[1].categoryWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[1].categoryWithNonPKColumns.name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedTags[1].categoryWithNonPKColumns.type).to.be.equal("common-category");
            const loadedTag = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categoryWithNonPKColumns", "category")
                .orderBy("category.code")
                .where("tag.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedTag.categoryWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTag.categoryWithNonPKColumns.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTag.categoryWithNonPKColumns.type).to.be.equal("common-category");
        })));
    });
    describe("inverse side", () => {
        it("should load related entity when JoinColumn is specified without options", () => Promise.all(connections.map(async (connection) => {
            const post1 = new Post_1.Post();
            post1.title = "About BMW";
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Boeing";
            await connection.manager.save(post2);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.post = post1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.post = post2;
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.post", "post")
                .orderBy("category.code, post.id")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].post).to.not.be.undefined;
            (0, chai_1.expect)(loadedCategories[0].post.id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategories[1].post).to.not.be.undefined;
            (0, chai_1.expect)(loadedCategories[1].post.id).to.be.equal(2);
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.post", "post")
                .orderBy("post.id")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.post).to.not.be.undefined;
            (0, chai_1.expect)(loadedCategory.post.id).to.be.equal(1);
        })));
        it("should load related entity when both entities have multiple primary columns and JoinColumn defined without options", () => Promise.all(connections.map(async (connection) => {
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 3;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            await connection.manager.save(tag2);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.tag = tag1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.tag = tag2;
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tag", "tag")
                .orderBy("category.code, tag.code")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].tag).to.not.be.undefined;
            (0, chai_1.expect)(loadedCategories[0].tag.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].tag.description).to.be.equal("Tag about BMW");
            (0, chai_1.expect)(loadedCategories[1].tag).to.not.be.undefined;
            (0, chai_1.expect)(loadedCategories[1].tag.title).to.be.equal("About Boeing");
            (0, chai_1.expect)(loadedCategories[1].tag.description).to.be.equal("tag about Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tag", "tag")
                .orderBy("tag.code")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.tag).to.not.be.undefined;
            (0, chai_1.expect)(loadedCategory.tag.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.tag.description).to.be.equal("Tag about BMW");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinColumn defined with options", () => Promise.all(connections.map(async (connection) => {
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 3;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            await connection.manager.save(tag2);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.tagWithOptions = tag1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.tagWithOptions = tag2;
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagWithOptions", "tag")
                .orderBy("category.code, tag.code")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].tagWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].tagWithOptions.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].tagWithOptions.description).to.be.equal("Tag about BMW");
            (0, chai_1.expect)(loadedCategories[1].tagWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].tagWithOptions.title).to.be.equal("About Boeing");
            (0, chai_1.expect)(loadedCategories[1].tagWithOptions.description).to.be.equal("tag about Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagWithOptions", "tag")
                .orderBy("tag.code")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.tagWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.tagWithOptions.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.tagWithOptions.description).to.be.equal("Tag about BMW");
        })));
        it("should load related entity when JoinColumns references on to non-primary columns", () => Promise.all(connections.map(async (connection) => {
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 3;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            await connection.manager.save(tag2);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.description = "category of cars";
            category1.tagWithNonPKColumns = tag1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.description = "category of airplanes";
            category2.tagWithNonPKColumns = tag2;
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagWithNonPKColumns", "tag")
                .orderBy("category.code, tag.code")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].tagWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].tagWithNonPKColumns.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].tagWithNonPKColumns.description).to.be.equal("Tag about BMW");
            (0, chai_1.expect)(loadedCategories[1].tagWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].tagWithNonPKColumns.title).to.be.equal("About Boeing");
            (0, chai_1.expect)(loadedCategories[1].tagWithNonPKColumns.description).to.be.equal("tag about Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagWithNonPKColumns", "tag")
                .orderBy("tag.code")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.tagWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.tagWithNonPKColumns.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.tagWithNonPKColumns.description).to.be.equal("Tag about BMW");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinColumn defined with options", () => Promise.all(connections.map(async (connection) => {
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 3;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            await connection.manager.save(tag2);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.tagWithOptions = tag1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.tagWithOptions = tag2;
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagWithOptions", "tag")
                .orderBy("category.code, tag.code")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].tagWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].tagWithOptions.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].tagWithOptions.description).to.be.equal("Tag about BMW");
            (0, chai_1.expect)(loadedCategories[1].tagWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].tagWithOptions.title).to.be.equal("About Boeing");
            (0, chai_1.expect)(loadedCategories[1].tagWithOptions.description).to.be.equal("tag about Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagWithOptions", "tag")
                .orderBy("tag.code")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.tagWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.tagWithOptions.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.tagWithOptions.description).to.be.equal("Tag about BMW");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinColumn references on to non-primary columns", () => Promise.all(connections.map(async (connection) => {
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 3;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            await connection.manager.save(tag2);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.description = "category of cars";
            category1.tagWithNonPKColumns = tag1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.description = "category of airplanes";
            category2.tagWithNonPKColumns = tag2;
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagWithNonPKColumns", "tag")
                .orderBy("category.code, tag.code")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].tagWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].tagWithNonPKColumns.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].tagWithNonPKColumns.description).to.be.equal("Tag about BMW");
            (0, chai_1.expect)(loadedCategories[1].tagWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].tagWithNonPKColumns.title).to.be.equal("About Boeing");
            (0, chai_1.expect)(loadedCategories[1].tagWithNonPKColumns.description).to.be.equal("tag about Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagWithNonPKColumns", "tag")
                .orderBy("tag.code")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.tagWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.tagWithNonPKColumns.title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.tagWithNonPKColumns.description).to.be.equal("Tag about BMW");
        })));
    });
});
//# sourceMappingURL=multiple-primary-keys-one-to-one.js.map