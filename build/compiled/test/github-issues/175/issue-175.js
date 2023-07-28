"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const chai_1 = require("chai");
describe("github issues > #175 ManyToMany relation doesn't put an empty array when the relation is empty", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return post with categories if they are attached to the post", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        await connection.manager.save(category2);
        const postWithCategories = new Post_1.Post();
        postWithCategories.title = "post with categories";
        postWithCategories.categories = [category1, category2];
        await connection.manager.save(postWithCategories);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .where("post.title = :title", {
            title: "post with categories",
        })
            .addOrderBy("categories.id")
            .getOne();
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.should.be.eql({
            id: 1,
            title: "post with categories",
            categories: [
                {
                    id: 1,
                    name: "category #1",
                },
                {
                    id: 2,
                    name: "category #2",
                },
            ],
        });
    })));
    it("should return post with categories even if post with empty categories was saved", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        await connection.manager.save(category2);
        const postWithoutCategories = new Post_1.Post();
        postWithoutCategories.title = "post without categories";
        postWithoutCategories.categories = [];
        await connection.manager.save(postWithoutCategories);
        const justPost = new Post_1.Post();
        justPost.title = "just post";
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .where("post.title = :title", {
            title: "post without categories",
        })
            .getOne();
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.should.be.eql({
            id: 1,
            title: "post without categories",
            categories: [],
        });
    })));
    it("should return post with categories even if post was saved without categories set", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        await connection.manager.save(category2);
        const justPost = new Post_1.Post();
        justPost.title = "just post";
        await connection.manager.save(justPost);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.secondaryCategories", "secondaryCategories")
            .where("post.title = :title", { title: "just post" })
            .getOne();
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.should.be.eql({
            id: 1,
            title: "just post",
            secondaryCategories: [],
        });
    })));
});
//# sourceMappingURL=issue-175.js.map