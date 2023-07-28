"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("other issues > escaping function parameter", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("select query builder should ignore function-based parameters", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "Super title";
        await connection.manager.save(post);
        (0, chai_1.expect)(() => {
            return connection.manager
                .createQueryBuilder(Post_1.Post, "post")
                .where("post.title = :title", {
                title: () => "Super title",
            })
                .getOne();
        }).to.throw(Error);
    })));
    it("insert query builder should work with function parameters", () => Promise.all(connections.map(async (connection) => {
        await connection.manager
            .getRepository(Post_1.Post)
            .createQueryBuilder()
            .insert()
            .values({
            title: () => "'super title'",
        })
            .execute();
        const post = await connection.manager.findOneBy(Post_1.Post, {
            title: "super title",
        });
        (0, chai_1.expect)(post).to.be.eql({ id: 1, title: "super title" });
    })));
    it("update query builder should work with function parameters", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "Super title";
        await connection.manager.save(post);
        await connection.manager
            .getRepository(Post_1.Post)
            .createQueryBuilder()
            .update()
            .set({
            title: () => "'super title'",
        })
            .where("id = :id", { id: post.id })
            .execute();
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            title: "super title",
        });
        (0, chai_1.expect)(loadedPost).to.be.eql({ id: 1, title: "super title" });
    })));
});
//# sourceMappingURL=escaping-function-parameter.js.map