"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const PostWithDeleteDateColumn_1 = require("./entity/PostWithDeleteDateColumn");
describe("persistence > persistence options > listeners", () => {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({ __dirname })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("save listeners should work by default", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Bakhrom";
        post.description = "Hello";
        await connection.manager.save(post);
        post.title.should.be.equal("Bakhrom!");
    })));
    it("save listeners should be disabled if save option is specified", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Bakhrom";
        post.description = "Hello";
        await connection.manager.save(post, { listeners: false });
        post.title.should.be.equal("Bakhrom");
    })));
    it("remove listeners should work by default", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Bakhrom";
        post.description = "Hello";
        await connection.manager.save(post);
        await connection.manager.remove(post);
        post.isRemoved.should.be.equal(true);
    })));
    it("remove listeners should be disabled if remove option is specified", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Bakhrom";
        post.description = "Hello";
        await connection.manager.save(post);
        await connection.manager.remove(post, { listeners: false });
        post.isRemoved.should.be.equal(false);
    })));
    it("soft-remove listeners should work by default", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithDeleteDateColumn_1.PostWithDeleteDateColumn();
        post.title = "Bakhrom";
        post.description = "Hello";
        await connection.manager.save(post);
        await connection.manager.softRemove(post);
        post.title.should.be.equal("Bakhrom!");
        post.isSoftRemoved.should.be.equal(true);
    })));
    it("soft-remove listeners should be disabled if remove option is specified", () => Promise.all(connections.map(async (connection) => {
        const post = new PostWithDeleteDateColumn_1.PostWithDeleteDateColumn();
        post.title = "Bakhrom";
        post.description = "Hello";
        await connection.manager.save(post);
        await connection.manager.softRemove(post, { listeners: false });
        post.title.should.be.equal("Bakhrom");
        post.isSoftRemoved.should.be.equal(false);
    })));
});
//# sourceMappingURL=persistence-options-listeners.js.map