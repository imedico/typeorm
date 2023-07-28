"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("persistence > null and default behaviour", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert value if it is set", () => Promise.all(connections.map(async (connection) => {
        // create category
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Category saved!";
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedPost).to.exist;
        loadedPost.should.be.eql({
            id: 1,
            title: "Category saved!",
        });
    })));
    it("should insert default when post.title is undefined", () => Promise.all(connections.map(async (connection) => {
        // create category
        const post = new Post_1.Post();
        post.id = 1;
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedPost).to.exist;
        loadedPost.should.be.eql({
            id: 1,
            title: "hello default value",
        });
    })));
    it("should insert NULL when post.title is null", () => Promise.all(connections.map(async (connection) => {
        // create category
        const post = new Post_1.Post();
        post.id = 1;
        post.title = null;
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedPost).to.exist;
        loadedPost.should.be.eql({
            id: 1,
            title: null,
        });
    })));
    it("should update nothing when post.title is undefined", () => Promise.all(connections.map(async (connection) => {
        // create category
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Category saved!";
        await connection.manager.save(post);
        post.title = undefined;
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedPost).to.exist;
        loadedPost.should.be.eql({
            id: 1,
            title: "Category saved!",
        });
    })));
    it("should update to null when post.title is null", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Category saved!";
        await connection.manager.save(post);
        post.title = null;
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedPost).to.exist;
        loadedPost.should.be.eql({
            id: 1,
            title: null,
        });
    })));
});
//# sourceMappingURL=null-and-default-behaviour.js.map