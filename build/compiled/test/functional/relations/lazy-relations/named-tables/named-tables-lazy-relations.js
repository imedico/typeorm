"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
/**
 * Because lazy relations are overriding prototype is impossible to run these tests on multiple connections.
 * So we run tests only for mysql.
 */
describe("named-tables-lazy-relations", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post, Category_1.Category],
        enabledDrivers: ["postgres"], // we can properly test lazy-relations only on one platform
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist and hydrate successfully on a relation without inverse side", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const categoryRepository = connection.getRepository(Category_1.Category);
        const savedCategory1 = new Category_1.Category();
        savedCategory1.name = "kids";
        const savedCategory2 = new Category_1.Category();
        savedCategory2.name = "people";
        const savedCategory3 = new Category_1.Category();
        savedCategory3.name = "animals";
        await categoryRepository.save(savedCategory1);
        await categoryRepository.save(savedCategory2);
        await categoryRepository.save(savedCategory3);
        const savedPost = new Post_1.Post();
        savedPost.title = "Hello post";
        savedPost.text = "This is post about post";
        savedPost.categories = Promise.resolve([
            savedCategory1,
            savedCategory2,
            savedCategory3,
        ]);
        await postRepository.save(savedPost);
        await savedPost.categories.should.eventually.be.eql([
            savedCategory1,
            savedCategory2,
            savedCategory3,
        ]);
        const post = (await postRepository.findOneBy({
            id: 1,
        }));
        post.title.should.be.equal("Hello post");
        post.text.should.be.equal("This is post about post");
        const categories = await post.categories;
        categories.length.should.be.equal(3);
        categories.should.deep.include(savedCategory1);
        categories.should.deep.include(savedCategory2);
        categories.should.deep.include(savedCategory3);
    })));
    it("should persist and hydrate successfully on a relation with inverse side", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const categoryRepository = connection.getRepository(Category_1.Category);
        const savedCategory1 = new Category_1.Category();
        savedCategory1.name = "kids";
        const savedCategory2 = new Category_1.Category();
        savedCategory2.name = "people";
        const savedCategory3 = new Category_1.Category();
        savedCategory3.name = "animals";
        await categoryRepository.save(savedCategory1);
        await categoryRepository.save(savedCategory2);
        await categoryRepository.save(savedCategory3);
        const savedPost = new Post_1.Post();
        savedPost.title = "Hello post";
        savedPost.text = "This is post about post";
        savedPost.twoSideCategories = Promise.resolve([
            savedCategory1,
            savedCategory2,
            savedCategory3,
        ]);
        await postRepository.save(savedPost);
        await savedPost.twoSideCategories.should.eventually.be.eql([
            savedCategory1,
            savedCategory2,
            savedCategory3,
        ]);
        const post = (await postRepository.findOneBy({
            id: 1,
        }));
        post.title.should.be.equal("Hello post");
        post.text.should.be.equal("This is post about post");
        const categories = await post.twoSideCategories;
        categories.length.should.be.equal(3);
        categories.should.deep.include(savedCategory1);
        categories.should.deep.include(savedCategory2);
        categories.should.deep.include(savedCategory3);
        const category = (await categoryRepository.findOneBy({
            id: 1,
        }));
        category.name.should.be.equal("kids");
        const twoSidePosts = await category.twoSidePosts;
        const likePost = new Post_1.Post();
        likePost.id = 1;
        likePost.title = "Hello post";
        likePost.text = "This is post about post";
        twoSidePosts.should.deep.include(likePost);
    })));
    it("should persist and hydrate successfully on a many-to-one relation without inverse side", () => Promise.all(connections.map(async (connection) => {
        // create some fake posts and categories to make sure that there are several post ids in the db
        const fakePosts = [];
        for (let i = 0; i < 30; i++) {
            const fakePost = new Post_1.Post();
            fakePost.title = "post #" + i;
            fakePost.text = "post #" + i;
            fakePosts.push(fakePost);
        }
        await connection.manager.save(fakePosts);
        const fakeCategories = [];
        for (let i = 0; i < 8; i++) {
            const fakeCategory = new Category_1.Category();
            fakeCategory.name = "category #" + i;
            fakeCategories.push(fakeCategory);
        }
        await connection.manager.save(fakeCategories);
        const category = new Category_1.Category();
        category.name = "category of great post";
        const post = new Post_1.Post();
        post.title = "post with great category";
        post.text = "post with great category and great text";
        post.category = Promise.resolve(category);
        await connection.manager.save(category);
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOne(Post_1.Post, {
            where: { title: "post with great category" },
        });
        const loadedCategory = await loadedPost.category;
        loadedCategory.name.should.be.equal("category of great post");
    })));
    it("should persist and hydrate successfully on a many-to-one relation with inverse side", () => Promise.all(connections.map(async (connection) => {
        // create some fake posts and categories to make sure that there are several post ids in the db
        const fakePosts = [];
        for (let i = 0; i < 8; i++) {
            const fakePost = new Post_1.Post();
            fakePost.title = "post #" + i;
            fakePost.text = "post #" + i;
            fakePosts.push(fakePost);
        }
        await connection.manager.save(fakePosts);
        const fakeCategories = [];
        for (let i = 0; i < 30; i++) {
            const fakeCategory = new Category_1.Category();
            fakeCategory.name = "category #" + i;
            fakeCategories.push(fakeCategory);
        }
        await connection.manager.save(fakeCategories);
        const category = new Category_1.Category();
        category.name = "category of great post";
        const post = new Post_1.Post();
        post.title = "post with great category";
        post.text = "post with great category and great text";
        post.twoSideCategory = Promise.resolve(category);
        await connection.manager.save(category);
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOne(Post_1.Post, {
            where: { title: "post with great category" },
        });
        const loadedCategory = await loadedPost.twoSideCategory;
        loadedCategory.name.should.be.equal("category of great post");
    })));
    it("should persist and hydrate successfully on a one-to-many relation", () => Promise.all(connections.map(async (connection) => {
        // create some fake posts and categories to make sure that there are several post ids in the db
        const fakePosts = [];
        for (let i = 0; i < 8; i++) {
            const fakePost = new Post_1.Post();
            fakePost.title = "post #" + i;
            fakePost.text = "post #" + i;
            fakePosts.push(fakePost);
        }
        await connection.manager.save(fakePosts);
        const fakeCategories = [];
        for (let i = 0; i < 30; i++) {
            const fakeCategory = new Category_1.Category();
            fakeCategory.name = "category #" + i;
            fakeCategories.push(fakeCategory);
        }
        await connection.manager.save(fakeCategories);
        const category = new Category_1.Category();
        category.name = "category of great post";
        await connection.manager.save(category);
        const post = new Post_1.Post();
        post.title = "post with great category";
        post.text = "post with great category and great text";
        post.twoSideCategory = Promise.resolve(category);
        await connection.manager.save(post);
        const loadedCategory = await connection.manager.findOne(Category_1.Category, { where: { name: "category of great post" } });
        const loadedPost = await loadedCategory.twoSidePosts2;
        loadedPost[0].title.should.be.equal("post with great category");
    })));
    it("should persist and hydrate successfully on a one-to-one relation owner side", () => Promise.all(connections.map(async (connection) => {
        // create some fake posts and categories to make sure that there are several post ids in the db
        const fakePosts = [];
        for (let i = 0; i < 8; i++) {
            const fakePost = new Post_1.Post();
            fakePost.title = "post #" + i;
            fakePost.text = "post #" + i;
            fakePosts.push(fakePost);
        }
        await connection.manager.save(fakePosts);
        const fakeCategories = [];
        for (let i = 0; i < 30; i++) {
            const fakeCategory = new Category_1.Category();
            fakeCategory.name = "category #" + i;
            fakeCategories.push(fakeCategory);
        }
        await connection.manager.save(fakeCategories);
        const category = new Category_1.Category();
        category.name = "category of great post";
        await connection.manager.save(category);
        const post = new Post_1.Post();
        post.title = "post with great category";
        post.text = "post with great category and great text";
        post.oneCategory = Promise.resolve(category);
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOne(Post_1.Post, {
            where: { title: "post with great category" },
        });
        const loadedCategory = await loadedPost.oneCategory;
        loadedCategory.name.should.be.equal("category of great post");
    })));
    it("should persist and hydrate successfully on a one-to-one relation inverse side", () => Promise.all(connections.map(async (connection) => {
        // create some fake posts and categories to make sure that there are several post ids in the db
        const fakePosts = [];
        for (let i = 0; i < 8; i++) {
            const fakePost = new Post_1.Post();
            fakePost.title = "post #" + i;
            fakePost.text = "post #" + i;
            fakePosts.push(fakePost);
        }
        await connection.manager.save(fakePosts);
        const fakeCategories = [];
        for (let i = 0; i < 30; i++) {
            const fakeCategory = new Category_1.Category();
            fakeCategory.name = "category #" + i;
            fakeCategories.push(fakeCategory);
        }
        await connection.manager.save(fakeCategories);
        const category = new Category_1.Category();
        category.name = "category of great post";
        await connection.manager.save(category);
        const post = new Post_1.Post();
        post.title = "post with great category";
        post.text = "post with great category and great text";
        post.oneCategory = Promise.resolve(category);
        await connection.manager.save(post);
        const loadedCategory = await connection.manager.findOne(Category_1.Category, { where: { name: "category of great post" } });
        const loadedPost = await loadedCategory.onePost;
        loadedPost.title.should.be.equal("post with great category");
    })));
});
//# sourceMappingURL=named-tables-lazy-relations.js.map