"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("relations > multiple-primary-keys > many-to-one", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("owning side", () => {
        it("should load related entity when JoinColumn is not specified", () => Promise.all(connections.map(async (connection) => {
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
            post1.title = "About BMW";
            post1.category = category1;
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Boeing";
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
            post1.title = "About BMW";
            post1.categoryWithJoinColumn = category1;
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Boeing";
            post2.categoryWithJoinColumn = category2;
            await connection.manager.save(post2);
            const loadedPosts = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoryWithJoinColumn", "category")
                .orderBy("post.id")
                .getMany();
            (0, chai_1.expect)(loadedPosts[0].categoryWithJoinColumn).to.not.be
                .undefined;
            (0, chai_1.expect)(loadedPosts[0].categoryWithJoinColumn.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPosts[0].categoryWithJoinColumn.type).to.be.equal("common-category");
            (0, chai_1.expect)(loadedPosts[1].categoryWithJoinColumn).to.not.be
                .undefined;
            (0, chai_1.expect)(loadedPosts[1].categoryWithJoinColumn.name).to.be.equal("airplanes");
            (0, chai_1.expect)(loadedPosts[1].categoryWithJoinColumn.type).to.be.equal("common-category");
            const loadedPost = await connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .leftJoinAndSelect("post.categoryWithJoinColumn", "category")
                .where("post.id = :id", { id: 1 })
                .getOne();
            (0, chai_1.expect)(loadedPost.categoryWithJoinColumn).to.not.be
                .undefined;
            (0, chai_1.expect)(loadedPost.categoryWithJoinColumn.name).to.be.equal("cars");
            (0, chai_1.expect)(loadedPost.categoryWithJoinColumn.type).to.be.equal("common-category");
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
            post1.title = "About BMW";
            post1.categoryWithOptions = category1;
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Boeing";
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
            post1.title = "About BMW";
            post1.categoryWithNonPKColumns = category1;
            await connection.manager.save(post1);
            const post2 = new Post_1.Post();
            post2.title = "About Boeing";
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
    });
    describe("inverse side", () => {
        it("should load related entity when JoinColumn is not specified", () => Promise.all(connections.map(async (connection) => {
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
            (0, chai_1.expect)(loadedCategories[0].posts[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].posts[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategories[0].posts[1].title).to.be.equal("About Audi");
            (0, chai_1.expect)(loadedCategories[1].posts).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].posts[0].id).to.be.equal(3);
            (0, chai_1.expect)(loadedCategories[1].posts[0].title).to.be.equal("About Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.posts", "posts")
                .orderBy("posts.id")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.posts).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.posts[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategory.posts[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.posts[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategory.posts[1].title).to.be.equal("About Audi");
        })));
        it("should load related entity when JoinColumn is specified without options", () => Promise.all(connections.map(async (connection) => {
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
            category1.postsWithJoinColumn = [post1, post2];
            await connection.manager.save(category1);
            const category2 = new Category_1.Category();
            category2.name = "airplanes";
            category2.type = "common-category";
            category2.code = 2;
            category2.version = 1;
            category2.postsWithJoinColumn = [post3];
            await connection.manager.save(category2);
            const loadedCategories = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.postsWithJoinColumn", "posts")
                .orderBy("category.code, posts.id")
                .getMany();
            (0, chai_1.expect)(loadedCategories[0].postsWithJoinColumn).to.not.be
                .undefined;
            (0, chai_1.expect)(loadedCategories[0].postsWithJoinColumn[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategories[0].postsWithJoinColumn[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].postsWithJoinColumn[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategories[0].postsWithJoinColumn[1].title).to.be.equal("About Audi");
            (0, chai_1.expect)(loadedCategories[1].postsWithJoinColumn).to.not.be
                .undefined;
            (0, chai_1.expect)(loadedCategories[1].postsWithJoinColumn[0].id).to.be.equal(3);
            (0, chai_1.expect)(loadedCategories[1].postsWithJoinColumn[0].title).to.be.equal("About Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.postsWithJoinColumn", "posts")
                .orderBy("posts.id")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.postsWithJoinColumn).to.not.be
                .undefined;
            (0, chai_1.expect)(loadedCategory.postsWithJoinColumn[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategory.postsWithJoinColumn[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.postsWithJoinColumn[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategory.postsWithJoinColumn[1].title).to.be.equal("About Audi");
        })));
        it("should load related entity when JoinColumn is specified with options", () => Promise.all(connections.map(async (connection) => {
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
            (0, chai_1.expect)(loadedCategories[0].postsWithOptions[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].postsWithOptions[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategories[0].postsWithOptions[1].title).to.be.equal("About Audi");
            (0, chai_1.expect)(loadedCategories[1].postsWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].postsWithOptions[0].id).to.be.equal(3);
            (0, chai_1.expect)(loadedCategories[1].postsWithOptions[0].title).to.be.equal("About Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.postsWithOptions", "posts")
                .orderBy("posts.id")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.postsWithOptions).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.postsWithOptions[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategory.postsWithOptions[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.postsWithOptions[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategory.postsWithOptions[1].title).to.be.equal("About Audi");
        })));
        it("should load related entity when JoinColumn references on to non-primary columns", () => Promise.all(connections.map(async (connection) => {
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
            (0, chai_1.expect)(loadedCategories[0].postsWithNonPKColumns[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategories[0].postsWithNonPKColumns[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategories[0].postsWithNonPKColumns[1].title).to.be.equal("About Audi");
            (0, chai_1.expect)(loadedCategories[1].postsWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategories[1].postsWithNonPKColumns[0].id).to.be.equal(3);
            (0, chai_1.expect)(loadedCategories[1].postsWithNonPKColumns[0].title).to.be.equal("About Boeing");
            const loadedCategory = await connection.manager
                .createQueryBuilder(Category_1.Category, "category")
                .leftJoinAndSelect("category.postsWithNonPKColumns", "posts")
                .orderBy("posts.id")
                .where("category.code = :code", { code: 1 })
                .getOne();
            (0, chai_1.expect)(loadedCategory.postsWithNonPKColumns).to.not.be.eql([]);
            (0, chai_1.expect)(loadedCategory.postsWithNonPKColumns[0].id).to.be.equal(1);
            (0, chai_1.expect)(loadedCategory.postsWithNonPKColumns[0].title).to.be.equal("About BMW");
            (0, chai_1.expect)(loadedCategory.postsWithNonPKColumns[1].id).to.be.equal(2);
            (0, chai_1.expect)(loadedCategory.postsWithNonPKColumns[1].title).to.be.equal("About Audi");
        })));
    });
});
//# sourceMappingURL=multiple-primary-keys-many-to-one.js.map