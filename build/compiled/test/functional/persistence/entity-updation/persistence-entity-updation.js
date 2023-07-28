"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const PostIncrement_1 = require("./entity/PostIncrement");
const PostUuid_1 = require("./entity/PostUuid");
const PostDefaultValues_1 = require("./entity/PostDefaultValues");
const PostSpecialColumns_1 = require("./entity/PostSpecialColumns");
const chai_1 = require("chai");
const PostMultiplePrimaryKeys_1 = require("./entity/PostMultiplePrimaryKeys");
const PostComplex_1 = require("./entity/PostComplex");
const PostEmbedded_1 = require("./entity/PostEmbedded");
describe("persistence > entity updation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({ __dirname })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should update generated auto-increment id after saving", () => Promise.all(connections.map(async (connection) => {
        const post = new PostIncrement_1.PostIncrement();
        post.text = "Hello Post";
        await connection.manager.save(post);
        // CockroachDB does not use incremental ids
        if (!(connection.driver.options.type === "cockroachdb"))
            post.id.should.be.equal(1);
    })));
    it("should update generated uuid after saving", () => Promise.all(connections.map(async (connection) => {
        const post = new PostUuid_1.PostUuid();
        post.text = "Hello Post";
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOneBy(PostUuid_1.PostUuid, {
            id: post.id,
        });
        post.id.should.be.equal(loadedPost.id);
    })));
    it("should update default values after saving", () => Promise.all(connections.map(async (connection) => {
        // Spanner does not support DEFAULT values
        if (connection.driver.options.type === "spanner")
            return;
        const post = new PostDefaultValues_1.PostDefaultValues();
        post.title = "Post #1";
        await connection.manager.save(post);
        post.title.should.be.equal("Post #1");
        post.text.should.be.equal("hello post");
        post.isActive.should.be.equal(true);
        post.addDate.should.be.instanceof(Date);
        post.views.should.be.equal(0);
        (0, chai_1.expect)(post.description).to.be.equal(null);
    })));
    it("should update special columns after saving", () => Promise.all(connections.map(async (connection) => {
        // Spanner does not support DEFAULT values
        if (connection.driver.options.type === "spanner")
            return;
        const post = new PostSpecialColumns_1.PostSpecialColumns();
        post.title = "Post #1";
        await connection.manager.save(post);
        post.title.should.be.equal("Post #1");
        post.createDate.should.be.instanceof(Date);
        post.updateDate.should.be.instanceof(Date);
        post.version.should.be.equal(1);
    })));
    it("should update even when multiple primary keys are used", () => Promise.all(connections.map(async (connection) => {
        const post = new PostMultiplePrimaryKeys_1.PostMultiplePrimaryKeys();
        post.firstId = 1;
        post.secondId = 3;
        await connection.manager.save(post);
        post.firstId.should.be.equal(1);
        post.secondId.should.be.equal(3);
        post.text.should.be.equal("Hello Multi Ids");
    })));
    it("should update even with embeddeds", () => Promise.all(connections.map(async (connection) => {
        // Spanner does not support DEFAULT values
        if (connection.driver.options.type === "spanner")
            return;
        const post = new PostComplex_1.PostComplex();
        post.firstId = 1;
        post.embed = new PostEmbedded_1.PostEmbedded();
        post.embed.secondId = 3;
        await connection.manager.save(post);
        post.firstId.should.be.equal(1);
        post.embed.secondId.should.be.equal(3);
        post.embed.createDate.should.be.instanceof(Date);
        post.embed.updateDate.should.be.instanceof(Date);
        post.embed.version.should.be.equal(1);
        post.text.should.be.equal("Hello Complexity");
        const loadedPost = await connection.manager.findOneBy(PostComplex_1.PostComplex, { firstId: 1, embed: { secondId: 3 } });
        loadedPost.firstId.should.be.equal(1);
        loadedPost.embed.secondId.should.be.equal(3);
        loadedPost.embed.createDate.should.be.instanceof(Date);
        loadedPost.embed.updateDate.should.be.instanceof(Date);
        loadedPost.embed.version.should.be.equal(1);
        loadedPost.text.should.be.equal("Hello Complexity");
    })));
});
//# sourceMappingURL=persistence-entity-updation.js.map