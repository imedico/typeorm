"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const Category_1 = require("./entity/Category");
describe("github issues > #3363 Isolation Level in transaction() from Connection", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should execute operations in READ UNCOMMITED isolation level", () => Promise.all(connections.map(async function (connection) {
        // SAP, Oracle does not support READ UNCOMMITTED isolation level
        if (connection.driver.options.type === "sap" ||
            connection.driver.options.type === "oracle")
            return;
        let postId = undefined, categoryId = undefined;
        await connection.transaction("READ UNCOMMITTED", async (transaction) => {
            const post = new Post_1.Post();
            post.title = "Post #1";
            await transaction.save(post);
            const category = new Category_1.Category();
            category.name = "Category #1";
            await transaction.save(category);
            postId = post.id;
            categoryId = category.id;
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
    it("should execute operations in SERIALIZABLE isolation level", () => Promise.all(connections.map(async (connection) => {
        let postId = undefined, categoryId = undefined;
        await connection.transaction("SERIALIZABLE", async (entityManager) => {
            const post = new Post_1.Post();
            post.title = "Post #1";
            await entityManager.save(post);
            const category = new Category_1.Category();
            category.name = "Category #1";
            await entityManager.save(category);
            postId = post.id;
            categoryId = category.id;
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
//# sourceMappingURL=issue-3363.js.map