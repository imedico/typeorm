"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const chai_1 = require("chai");
describe("transaction > return data from transaction", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: [
            "mysql",
            "sqlite",
            "better-sqlite3",
            "postgres",
        ], // todo: for some reasons mariadb tests are not passing here
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should allow to return typed data from transaction", () => Promise.all(connections.map(async (connection) => {
        const { postId, categoryId } = await connection.manager.transaction(async (entityManager) => {
            const post = new Post_1.Post();
            post.title = "Post #1";
            await entityManager.save(post);
            const category = new Category_1.Category();
            category.name = "Category #1";
            await entityManager.save(category);
            return {
                postId: post.id,
                categoryId: category.id,
            };
        });
        const post = await connection.manager.findOne(Post_1.Post, {
            where: { title: "Post #1" },
        });
        (0, chai_1.expect)(post).not.to.be.null;
        post.should.be.eql({
            id: postId,
            title: "Post #1",
        });
        const category = await connection.manager.findOne(Category_1.Category, {
            where: { name: "Category #1" },
        });
        (0, chai_1.expect)(category).not.to.be.null;
        category.should.be.eql({
            id: categoryId,
            name: "Category #1",
        });
    })));
    it("should allow to return typed data from transaction using type inference", () => Promise.all(connections.map(async (connection) => {
        const { postId, categoryId } = await connection.manager.transaction(async (entityManager) => {
            const post = new Post_1.Post();
            post.title = "Post #1";
            await entityManager.save(post);
            const category = new Category_1.Category();
            category.name = "Category #1";
            await entityManager.save(category);
            return {
                postId: post.id,
                categoryId: category.id,
            };
        });
        const post = await connection.manager.findOne(Post_1.Post, {
            where: { title: "Post #1" },
        });
        (0, chai_1.expect)(post).not.to.be.null;
        post.should.be.eql({
            id: postId,
            title: "Post #1",
        });
        const category = await connection.manager.findOne(Category_1.Category, {
            where: { name: "Category #1" },
        });
        (0, chai_1.expect)(category).not.to.be.null;
        category.should.be.eql({
            id: categoryId,
            name: "Category #1",
        });
    })));
});
//# sourceMappingURL=return-data-from-transaction.js.map