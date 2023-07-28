"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const Tag_1 = require("./entity/Tag");
describe("relations > multiple-primary-keys > many-to-many", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("owning side", () => {
        it("should load related entity when JoinTable used without options", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "BMW";
            category2.type = "cars-category";
            category2.code = 2;
            category2.version = 1;
            await connection.manager.save(category2);
            const category3 = new Category_1.Category();
            category3.name = "airplanes";
            category3.type = "common-category";
            category3.code = 3;
            category3.version = 1;
            await connection.manager.save(category3);
            const post1 = new Post_1.Post();
            post1.title = "About BMW";
            post1.categories = [category1, category2];
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Boeing";
            post2.categories = [category3];
            await connection.manager.save(post2);
            const loadedPosts = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categories", "categories")
                .orderBy("post.id, categories.code")
                .getMany();
            (0, chai_1.expect)(loadedPosts[0].categories).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[0].categories[0].name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPosts[0].categories[0].type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedPosts[0].categories[1].name).to.be.equal("BMW");
            (0, chai_1.expect)(loadedPosts[0].categories[1].type).to.be.equal("cars-category");
            (0, chai_1.expect)(loadedPosts[1].categories).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[1].categories[0].name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedPosts[1].categories[0].type).to.be.equal("common-category");
            const loadedPost = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categories", "categories")
                .orderBy("categories.code")
                .where("post.id = :id", { id: 1 })
                .getOne();
            (0, chai_1.expect)(loadedPost.categories).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPost.categories[0].name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPost.categories[0].type).to.be.equal("common-category");
        })));
        it("should load related entity when JoinTable used with options", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "BMW";
            category2.type = "cars-category";
            category2.code = 2;
            category2.version = 1;
            await connection.manager.save(category2);
            const category3 = new Category_1.Category();
            category3.name = "airplanes";
            category3.type = "common-category";
            category3.code = 3;
            category3.version = 1;
            await connection.manager.save(category3);
            const post1 = new Post_1.Post();
            post1.title = "About BMW";
            post1.categoriesWithOptions = [category1, category2];
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Boeing";
            post2.categoriesWithOptions = [category3];
            await connection.manager.save(post2);
            const loadedPosts = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoriesWithOptions", "categories")
                .orderBy("post.id, categories.code")
                .getMany();
            (0, chai_1.expect)(loadedPosts[0].categoriesWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[0].categoriesWithOptions[0].name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPosts[0].categoriesWithOptions[0].type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedPosts[0].categoriesWithOptions[1].name).to.be.equal("BMW");
            (0, chai_1.expect)(loadedPosts[0].categoriesWithOptions[1].type).to.be.equal("cars-category");
            (0, chai_1.expect)(loadedPosts[1].categoriesWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[1].categoriesWithOptions[0].name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedPosts[1].categoriesWithOptions[0].type).to.be.equal("common-category");
            const loadedPost = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoriesWithOptions", "categories")
                .orderBy("categories.code")
                .where("post.id = :id", { id: 1 })
                .getOne();
            (0, chai_1.expect)(loadedPost.categoriesWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPost.categoriesWithOptions[0].name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPost.categoriesWithOptions[0].type).to.be.equal("common-category");
        })));
        it("should load related entity when JoinTable references with non-primary columns", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.description = "category of cars";
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "BMW";
            category2.type = "cars-category";
            category2.code = 2;
            category2.version = 1;
            category2.description = "category of BMW";
            await connection.manager.save(category2);
            const category3 = new Category_1.Category();
            category3.name = "airplanes";
            category3.type = "common-category";
            category3.code = 3;
            category3.version = 1;
            category3.description = "category of airplanes";
            await connection.manager.save(category3);
            const post1 = new Post_1.Post();
            post1.title = "About BMW";
            post1.categoriesWithNonPKColumns = [category1, category2];
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Boeing";
            post2.categoriesWithNonPKColumns = [category3];
            await connection.manager.save(post2);
            const loadedPosts = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoriesWithNonPKColumns", "categories")
                .orderBy("post.id, categories.code")
                .getMany();
            (0, chai_1.expect)(loadedPosts[0].categoriesWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[0].categoriesWithNonPKColumns[0].code).to.be.equal(1);
            (0, chai_1.expect)(loadedPosts[0].categoriesWithNonPKColumns[0].version).to.be.equal(1);
            (0, chai_1.expect)(loadedPosts[0].categoriesWithNonPKColumns[0]
                .description).to.be.equal("category of cars");
            (0, chai_1.expect)(loadedPosts[0].categoriesWithNonPKColumns[1].code).to.be.equal(2);
            (0, chai_1.expect)(loadedPosts[0].categoriesWithNonPKColumns[1].version).to.be.equal(1);
            (0, chai_1.expect)(loadedPosts[0].categoriesWithNonPKColumns[1]
                .description).to.be.equal("category of BMW");
            (0, chai_1.expect)(loadedPosts[1].categoriesWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPosts[1].categoriesWithNonPKColumns[0].code).to.be.equal(3);
            (0, chai_1.expect)(loadedPosts[1].categoriesWithNonPKColumns[0].version).to.be.equal(1);
            (0, chai_1.expect)(loadedPosts[1].categoriesWithNonPKColumns[0]
                .description).to.be.equal("category of airplanes");
            const loadedPost = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoriesWithNonPKColumns", "categories")
                .orderBy("categories.code")
                .where("post.id = :id", { id: 1 })
                .getOne();
            (0, chai_1.expect)(loadedPost.categoriesWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedPost.categoriesWithNonPKColumns[0].code).to.be.equal(1);
            (0, chai_1.expect)(loadedPost.categoriesWithNonPKColumns[0].version).to.be.equal(1);
            (0, chai_1.expect)(loadedPost.categoriesWithNonPKColumns[0].description).to.be.equal("category of cars");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinTable used without options", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "BMW";
            category2.type = "cars-category";
            category2.code = 2;
            category2.version = 1;
            await connection.manager.save(category2);
            const category3 = new Category_1.Category();
            category3.name = "airplanes";
            category3.type = "common-category";
            category3.code = 3;
            category3.version = 1;
            await connection.manager.save(category3);
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            tag1.categories = [category1, category2];
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 2;
            tag2.title = "About Boeing";
            tag2.description = "tag about Boeing";
            tag2.categories = [category3];
            await connection.manager.save(tag2);
            const loadedTags = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categories", "categories")
                .orderBy("tag.code, categories.code")
                .getMany();
            (0, chai_1.expect)(loadedTags[0].categories).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[0].categories[0].name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTags[0].categories[0].type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedTags[0].categories[1].name).to.be.equal("BMW");
            (0, chai_1.expect)(loadedTags[0].categories[1].type).to.be.equal("cars-category");
            (0, chai_1.expect)(loadedTags[1].categories).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[1].categories[0].name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedTags[1].categories[0].type).to.be.equal("common-category");
            const loadedTag = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categories", "categories")
                .orderBy("categories.code")
                .where("tag.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedTag.categories).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTag.categories[0].name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTag.categories[0].type).to.be.equal("common-category");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinTable used with options", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "BMW";
            category2.type = "cars-category";
            category2.code = 2;
            category2.version = 1;
            await connection.manager.save(category2);
            const category3 = new Category_1.Category();
            category3.name = "airplanes";
            category3.type = "common-category";
            category3.code = 3;
            category3.version = 1;
            await connection.manager.save(category3);
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            tag1.categoriesWithOptions = [category1, category2];
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 2;
            tag2.title = "About Boeing";
            tag2.description = "Tag about Boeing";
            tag2.categoriesWithOptions = [category3];
            await connection.manager.save(tag2);
            const loadedTags = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categoriesWithOptions", "categories")
                .orderBy("tag.code, categories.code")
                .getMany();
            (0, chai_1.expect)(loadedTags[0].categoriesWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[0].categoriesWithOptions[0].name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTags[0].categoriesWithOptions[0].type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedTags[0].categoriesWithOptions[1].name).to.be.equal("BMW");
            (0, chai_1.expect)(loadedTags[0].categoriesWithOptions[1].type).to.be.equal("cars-category");
            (0, chai_1.expect)(loadedTags[1].categoriesWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[1].categoriesWithOptions[0].name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedTags[1].categoriesWithOptions[0].type).to.be.equal("common-category");
            const loadedTag = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categoriesWithOptions", "categories")
                .orderBy("categories.code")
                .where("tag.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedTag.categoriesWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTag.categoriesWithOptions[0].name).to.be.equal("cars");
            (0, chai_1.expect)(loadedTag.categoriesWithOptions[0].type).to.be.equal("common-category");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinTable references with non-primary columns", () => Promise.all(connections.map(async (connection) => {
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.description = "category of cars";
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "BMW";
            category2.type = "cars-category";
            category2.code = 2;
            category2.version = 1;
            category2.description = "category of BMW";
            await connection.manager.save(category2);
            const category3 = new Category_1.Category();
            category3.name = "airplanes";
            category3.type = "common-category";
            category3.code = 3;
            category3.version = 1;
            category3.description = "category of airplanes";
            await connection.manager.save(category3);
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            tag1.categoriesWithNonPKColumns = [category1, category2];
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 2;
            tag2.title = "About Boeing";
            tag2.description = "Tag about Boeing";
            tag2.categoriesWithNonPKColumns = [category3];
            await connection.manager.save(tag2);
            const loadedTags = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categoriesWithNonPKColumns", "categories")
                .orderBy("tag.code, categories.code")
                .getMany();
            (0, chai_1.expect)(loadedTags[0].categoriesWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[0].categoriesWithNonPKColumns[0].code).to.be.equal(1);
            (0, chai_1.expect)(loadedTags[0].categoriesWithNonPKColumns[0].version).to.be.equal(1);
            (0, chai_1.expect)(loadedTags[0].categoriesWithNonPKColumns[0].description).to.be.equal("category of cars");
            (0, chai_1.expect)(loadedTags[0].categoriesWithNonPKColumns[1].code).to.be.equal(2);
            (0, chai_1.expect)(loadedTags[0].categoriesWithNonPKColumns[1].version).to.be.equal(1);
            (0, chai_1.expect)(loadedTags[0].categoriesWithNonPKColumns[1].description).to.be.equal("category of BMW");
            (0, chai_1.expect)(loadedTags[1].categoriesWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTags[1].categoriesWithNonPKColumns[0].code).to.be.equal(3);
            (0, chai_1.expect)(loadedTags[1].categoriesWithNonPKColumns[0].version).to.be.equal(1);
            (0, chai_1.expect)(loadedTags[1].categoriesWithNonPKColumns[0].description).to.be.equal("category of airplanes");
            const loadedTag = await connection.manager
                .createQueryBuilder(Tag_1.Tag, "tag")
                .leftJoinAndSelect("tag.categoriesWithNonPKColumns", "categories")
                .orderBy("categories.code")
                .where("tag.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedTag.categoriesWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedTag.categoriesWithNonPKColumns[0].code).to.be.equal(1);
            (0, chai_1.expect)(loadedTag.categoriesWithNonPKColumns[0].version).to.be.equal(1);
            (0, chai_1.expect)(loadedTag.categoriesWithNonPKColumns[0].description).to.be.equal("category of cars");
        })));
    });
    describe("inverse side", () => {
        it("should load related entity when JoinTable used without options", () => Promise.all(connections.map(async (connection) => {
            const post1 = new Post_1.Post();
            post1.title = "About BMW";
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Audi";
            await connection.manager.save(post2);
            const post3 = new Post_1.Post();
            post3.title = "About Boeing";
            await connection.manager.save(post3);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.posts = [post1, post2];
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.posts = [post3];
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.posts", "posts")
                .orderBy("category.code, posts.id")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].posts).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].posts[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategories[0].posts[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategories[1].posts).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].posts[0].id).to.be.equal(3);
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.posts", "posts")
                .orderBy("posts.id")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.posts).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.posts[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategory.posts[1].id).to.be.equal(2);
        })));
        it("should load related entity when JoinTable used with options", () => Promise.all(connections.map(async (connection) => {
            const post1 = new Post_1.Post();
            post1.title = "About BMW";
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Audi";
            await connection.manager.save(post2);
            const post3 = new Post_1.Post();
            post3.title = "About Boeing";
            await connection.manager.save(post3);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.postsWithOptions = [post1, post2];
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.postsWithOptions = [post3];
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.postsWithOptions", "posts")
                .orderBy("category.code, posts.id")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].postsWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].postsWithOptions[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategories[0].postsWithOptions[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategories[1].postsWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].postsWithOptions[0].id).to.be.equal(3);
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.postsWithOptions", "posts")
                .orderBy("posts.id")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.postsWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.postsWithOptions[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategory.postsWithOptions[1].id).to.be.equal(2);
        })));
        it("should load related entity when JoinTable references with non-primary columns", () => Promise.all(connections.map(async (connection) => {
            const post1 = new Post_1.Post();
            post1.title = "About BMW";
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Audi";
            await connection.manager.save(post2);
            const post3 = new Post_1.Post();
            post3.title = "About Boeing";
            await connection.manager.save(post3);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.description = "category of cars";
            category1.postsWithNonPKColumns = [post1, post2];
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.description = "category of airplanes";
            category2.postsWithNonPKColumns = [post3];
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.postsWithNonPKColumns", "posts")
                .orderBy("category.code, posts.id")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].postsWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].postsWithNonPKColumns[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategories[0].postsWithNonPKColumns[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategories[1].postsWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].postsWithNonPKColumns[0].id).to.be.equal(3);
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.postsWithNonPKColumns", "posts")
                .orderBy("posts.id")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.postsWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.postsWithNonPKColumns[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategory.postsWithNonPKColumns[1].id).to.be.equal(2);
        })));
        it("should load related entity when both entities have multiple primary columns and JoinTable used without options", () => Promise.all(connections.map(async (connection) => {
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 2;
            tag2.title = "About Audi";
            tag2.description = "Tag about Audi";
            await connection.manager.save(tag2);
            const tag3 = new Tag_1.Tag();
            tag3.code = 3;
            tag3.title = "About Boeing";
            tag3.description = "tag about Boeing";
            await connection.manager.save(tag3);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.tags = [tag1, tag2];
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.tags = [tag3];
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tags", "tags")
                .orderBy("category.code, tags.code")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].tags).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].tags[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].tags[0].description).to.be.equal("Tag about BMW");
            (0, chai_1.expect)(loadedCategories[0].tags[1].title).to.be.equal("About Audi");
            (0, chai_1.expect)(loadedCategories[0].tags[1].description).to.be.equal("Tag about Audi");
            (0, chai_1.expect)(loadedCategories[1].tags).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].tags[0].title).to.be.equal("About Boeing");
            (0, chai_1.expect)(loadedCategories[1].tags[0].description).to.be.equal("tag about Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tags", "tags")
                .orderBy("tags.code")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.tags).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.tags[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.tags[0].description).to.be.equal("Tag about BMW");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinTable used with options", () => Promise.all(connections.map(async (connection) => {
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 2;
            tag2.title = "About Audi";
            tag2.description = "Tag about Audi";
            await connection.manager.save(tag2);
            const tag3 = new Tag_1.Tag();
            tag3.code = 3;
            tag3.title = "About Boeing";
            tag3.description = "tag about Boeing";
            await connection.manager.save(tag3);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.tagsWithOptions = [tag1, tag2];
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.tagsWithOptions = [tag3];
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagsWithOptions", "tags")
                .orderBy("category.code, tags.code")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].tagsWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].tagsWithOptions[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].tagsWithOptions[0].description).to.be.equal("Tag about BMW");
            (0, chai_1.expect)(loadedCategories[0].tagsWithOptions[1].title).to.be.equal("About Audi");
            (0, chai_1.expect)(loadedCategories[0].tagsWithOptions[1].description).to.be.equal("Tag about Audi");
            (0, chai_1.expect)(loadedCategories[1].tagsWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].tagsWithOptions[0].title).to.be.equal("About Boeing");
            (0, chai_1.expect)(loadedCategories[1].tagsWithOptions[0].description).to.be.equal("tag about Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagsWithOptions", "tags")
                .orderBy("tags.code")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.tagsWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.tagsWithOptions[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.tagsWithOptions[0].description).to.be.equal("Tag about BMW");
        })));
        it("should load related entity when both entities have multiple primary columns and JoinTable references with non-primary columns", () => Promise.all(connections.map(async (connection) => {
            const tag1 = new Tag_1.Tag();
            tag1.code = 1;
            tag1.title = "About BMW";
            tag1.description = "Tag about BMW";
            await connection.manager.save(tag1);
            const tag2 = new Tag_1.Tag();
            tag2.code = 2;
            tag2.title = "About Audi";
            tag2.description = "Tag about Audi";
            await connection.manager.save(tag2);
            const tag3 = new Tag_1.Tag();
            tag3.code = 3;
            tag3.title = "About Boeing";
            tag3.description = "tag about Boeing";
            await connection.manager.save(tag3);
            const category1 = new Category_1.Category();
            category1.name = "cars";
            category1.type = "common-category";
            category1.code = 1;
            category1.version = 1;
            category1.description = "category of cars";
            category1.tagsWithNonPKColumns = [tag1, tag2];
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.description = "category of airplanes";
            category2.tagsWithNonPKColumns = [tag3];
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagsWithNonPKColumns", "tags")
                .orderBy("category.code, tags.code")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].tagsWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[0].tagsWithNonPKColumns[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].tagsWithNonPKColumns[0].description).to.be.equal("Tag about BMW");
            (0, chai_1.expect)(loadedCategories[0].tagsWithNonPKColumns[1].title).to.be.equal("About Audi");
            (0, chai_1.expect)(loadedCategories[0].tagsWithNonPKColumns[1].description).to.be.equal("Tag about Audi");
            (0, chai_1.expect)(loadedCategories[1].tagsWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].tagsWithNonPKColumns[0].title).to.be.equal("About Boeing");
            (0, chai_1.expect)(loadedCategories[1].tagsWithNonPKColumns[0].description).to.be.equal("tag about Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.tagsWithNonPKColumns", "tags")
                .orderBy("tags.code")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.tagsWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.tagsWithNonPKColumns[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.tagsWithNonPKColumns[0].description).to.be.equal("Tag about BMW");
        })));
    });
});
//# sourceMappingURL=multiple-primary-keys-many-to-many.js.map