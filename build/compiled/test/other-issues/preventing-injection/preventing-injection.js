"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const EntityPropertyNotFoundError_1 = require("../../../src/error/EntityPropertyNotFoundError");
describe("other issues > preventing-injection", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not allow selection of non-exist columns via FindOptions", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.title = "hello";
        await connection.manager.save(post);
        const postWithOnlyIdSelected = await connection.manager.find(Post_1.Post, {
            select: { id: true },
        });
        postWithOnlyIdSelected.should.be.eql([{ id: 1 }]);
        await connection.manager.find(Post_1.Post, {
            select: "(WHERE LIMIT 1)",
        }).should.be.rejected;
    })));
    it("should throw error for non-exist columns in where expression via FindOptions", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.title = "hello";
        await connection.manager.save(post);
        const postWithOnlyIdSelected = await connection.manager.find(Post_1.Post, {
            where: {
                title: "hello",
            },
        });
        postWithOnlyIdSelected.should.be.eql([
            { id: 1, title: "hello" },
        ]);
        let error;
        try {
            await connection.manager.find(Post_1.Post, {
                where: {
                    id: 2,
                    ["(WHERE LIMIT 1)"]: "hello",
                },
            });
        }
        catch (err) {
            error = err;
        }
        (0, chai_1.expect)(error).to.be.an.instanceof(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
    it("should not allow selection of non-exist columns via FindOptions", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.title = "hello";
        await connection.manager.save(post);
        const loadedPosts = await connection.manager.find(Post_1.Post, {
            order: {
                title: "DESC",
            },
        });
        loadedPosts.should.be.eql([{ id: 1, title: "hello" }]);
        await connection.manager.find(Post_1.Post, {
            order: {
                ["(WHERE LIMIT 1)"]: "DESC",
            },
        }).should.be.rejected;
    })));
    it("should not allow non-numeric values in skip and take via FindOptions", () => Promise.all(connections.map(async function (connection) {
        await connection.manager.find(Post_1.Post, {
            take: "(WHERE XXX)",
        }).should.be.rejected;
        await connection.manager.find(Post_1.Post, {
            skip: "(WHERE LIMIT 1)",
            take: "(WHERE XXX)",
        }).should.be.rejected;
    })));
    it("should not allow non-numeric values in skip and take in QueryBuilder", () => Promise.all(connections.map(async function (connection) {
        (0, chai_1.expect)(() => {
            connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .take("(WHERE XXX)");
        }).to.throw(Error);
        (0, chai_1.expect)(() => {
            connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .skip("(WHERE LIMIT 1)");
        }).to.throw(Error);
    })));
    it("should not allow non-allowed values in order by in QueryBuilder", () => Promise.all(connections.map(async function (connection) {
        (0, chai_1.expect)(() => {
            connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .orderBy("post.id", "MIX");
        }).to.throw(Error);
        (0, chai_1.expect)(() => {
            connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .orderBy("post.id", "DESC", "SOMETHING LAST");
        }).to.throw(Error);
    })));
});
//# sourceMappingURL=preventing-injection.js.map