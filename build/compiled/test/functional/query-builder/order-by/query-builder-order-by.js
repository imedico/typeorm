"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("query builder > order-by", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be always in right order(default order)", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.myOrder = 1;
        const post2 = new Post_1.Post();
        post2.myOrder = 2;
        await connection.manager.save([post1, post2]);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .getOne();
        (0, chai_1.expect)(loadedPost.myOrder).to.be.equal(2);
    })));
    it("should be always in right order(custom order)", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.myOrder = 1;
        const post2 = new Post_1.Post();
        post2.myOrder = 2;
        await connection.manager.save([post1, post2]);
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .addOrderBy("post.myOrder", "ASC")
            .getOne();
        (0, chai_1.expect)(loadedPost.myOrder).to.be.equal(1);
    })));
    it("should be always in right order(custom order)", () => Promise.all(connections.map(async (connection) => {
        if (!(connection.driver.options.type === "postgres"))
            // NULLS FIRST / LAST only supported by postgres
            return;
        const post1 = new Post_1.Post();
        post1.myOrder = 1;
        const post2 = new Post_1.Post();
        post2.myOrder = 2;
        await connection.manager.save([post1, post2]);
        const loadedPost1 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .addOrderBy("post.myOrder", "ASC", "NULLS FIRST")
            .getOne();
        (0, chai_1.expect)(loadedPost1.myOrder).to.be.equal(1);
        const loadedPost2 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .addOrderBy("post.myOrder", "ASC", "NULLS LAST")
            .getOne();
        (0, chai_1.expect)(loadedPost2.myOrder).to.be.equal(1);
    })));
    it("should be always in right order(custom order)", () => Promise.all(connections.map(async (connection) => {
        if (!DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            // IS NULL / IS NOT NULL only supported by mysql
            return;
        const post1 = new Post_1.Post();
        post1.myOrder = 1;
        const post2 = new Post_1.Post();
        post2.myOrder = 2;
        await connection.manager.save([post1, post2]);
        const loadedPost1 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .addOrderBy("post.myOrder IS NULL", "ASC")
            .getOne();
        (0, chai_1.expect)(loadedPost1.myOrder).to.be.equal(1);
        const loadedPost2 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .addOrderBy("post.myOrder IS NOT NULL", "ASC")
            .getOne();
        (0, chai_1.expect)(loadedPost2.myOrder).to.be.equal(1);
    })));
    it("should be able to order by sql statement", () => Promise.all(connections.map(async (connection) => {
        if (!DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            return; // DIV statement does not supported by all drivers
        const post1 = new Post_1.Post();
        post1.myOrder = 1;
        post1.num1 = 10;
        post1.num2 = 5;
        const post2 = new Post_1.Post();
        post2.myOrder = 2;
        post2.num1 = 10;
        post2.num2 = 2;
        await connection.manager.save([post1, post2]);
        const loadedPost1 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .orderBy("post.num1 DIV post.num2")
            .getOne();
        (0, chai_1.expect)(loadedPost1.num1).to.be.equal(10);
        (0, chai_1.expect)(loadedPost1.num2).to.be.equal(5);
        const loadedPost2 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .orderBy("post.num1 DIV post.num2", "DESC")
            .getOne();
        (0, chai_1.expect)(loadedPost2.num1).to.be.equal(10);
        (0, chai_1.expect)(loadedPost2.num2).to.be.equal(2);
    })));
});
//# sourceMappingURL=query-builder-order-by.js.map