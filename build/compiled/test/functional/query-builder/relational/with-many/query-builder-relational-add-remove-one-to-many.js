"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../../../utils/test-utils");
const chai_1 = require("chai");
describe("query builder > relational query builder > add operation > one to many relation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should add entity relation of a given entity by entity objects", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "category #3";
        await connection.manager.save(category3);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #3";
        await connection.manager.save(post3);
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of(category1)
            .add(post1);
        let loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.eql({
            id: 1,
            name: "category #1",
        });
        let loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost2.category).to.be.null;
        let loadedPost3 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 3 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost3.category).to.be.null;
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of(category1)
            .remove(post1);
        loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.null;
        loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost2.category).to.be.null;
        loadedPost3 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 3 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost3.category).to.be.null;
    })));
    it("should add entity relation of a given entity by entity id", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "category #3";
        await connection.manager.save(category3);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #3";
        await connection.manager.save(post3);
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of(2) // category id
            .add(2); // post id
        let loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.null;
        let loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost2.category).to.be.eql({
            id: 2,
            name: "category #2",
        });
        let loadedPost3 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 3 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost3.category).to.be.null;
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of(2) // category id
            .remove(2); // post id
        loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.null;
        loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost2.category).to.be.null;
        loadedPost3 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 3 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost3.category).to.be.null;
    })));
    it("should add entity relation of a given entity by entity id map", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "category #3";
        await connection.manager.save(category3);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #3";
        await connection.manager.save(post3);
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of({ id: 3 }) // category id
            .add({ id: 3 }); // post id
        let loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.null;
        let loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost2.category).to.be.null;
        let loadedPost3 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 3 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost3.category).to.be.eql({
            id: 3,
            name: "category #3",
        });
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of({ id: 3 }) // category id
            .remove({ id: 3 }); // post id
        loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.null;
        loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost2.category).to.be.null;
        loadedPost3 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 3 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost3.category).to.be.null;
    })));
    it("should add multiple entities into relation of a multiple entities", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "category #3";
        await connection.manager.save(category3);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #3";
        await connection.manager.save(post3);
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of({ id: 3 }) // category
            .add([{ id: 1 }, { id: 3 }]); // posts
        let loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.eql({
            id: 3,
            name: "category #3",
        });
        let loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost2.category).to.be.null;
        let loadedPost3 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 3 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost3.category).to.be.eql({
            id: 3,
            name: "category #3",
        });
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of({ id: 3 }) // category
            .remove([{ id: 1 }, { id: 3 }]); // posts
        loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 1 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.null;
        loadedPost2 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost2.category).to.be.null;
        loadedPost3 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 3 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost3.category).to.be.null;
    })));
    it("should handle addAndRemove method as well", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "category #3";
        await connection.manager.save(category3);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #3";
        await connection.manager.save(post3);
        // add initial data
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of(category3) // category
            .add(post2); // post
        let loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.eql({
            id: 3,
            name: "category #3",
        });
        // when nothing is specified nothing should be performed
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of(category3) // category
            .addAndRemove([], []); // post
        loadedPost1 = await connection.manager.findOne(Post_1.Post, {
            where: { id: 2 },
            relations: { category: true },
        });
        (0, chai_1.expect)(loadedPost1.category).to.be.eql({
            id: 3,
            name: "category #3",
        });
        // now add and remove =)
        await connection
            .createQueryBuilder()
            .relation(Category_1.Category, "posts")
            .of(category3) // category
            .addAndRemove([post1, post3], [post2]); // post
        const loadedCategory = await connection.manager.findOne(Category_1.Category, { where: { id: 3 }, relations: { posts: true } });
        (0, chai_1.expect)(loadedCategory.posts).to.deep.include({
            id: 1,
            title: "post #1",
        });
        (0, chai_1.expect)(loadedCategory.posts).to.not.contain({
            id: 2,
            title: "post #2",
        });
        (0, chai_1.expect)(loadedCategory.posts).to.deep.include({
            id: 3,
            title: "post #3",
        });
    })));
});
//# sourceMappingURL=query-builder-relational-add-remove-one-to-many.js.map