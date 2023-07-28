"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("other issues > mongodb entity change in subscribers should affect persistence", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("if entity was changed, subscriber should be take updated columns", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.title = "hello world";
        await connection.manager.save(post);
        // check if it was inserted correctly
        const loadedPost = await connection.manager.findOneById(Post_1.Post, post.id);
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.active.should.be.equal(false);
        // now update some property and let update subscriber trigger
        loadedPost.active = true;
        loadedPost.title += "!";
        await connection.manager.save(loadedPost);
        // check if subscriber was triggered and entity was really taken changed columns in the subscriber
        const loadedUpdatedPost = await connection.manager.findOneById(Post_1.Post, post.id);
        (0, chai_1.expect)(loadedUpdatedPost).not.to.be.null;
        (0, chai_1.expect)(loadedUpdatedPost.title).to.equals("hello world!");
        (0, chai_1.expect)(loadedUpdatedPost.updatedColumns).to.equals(4); // it actually should be 3, but ObjectId column always added
        await connection.manager.save(loadedPost);
    })));
    it("if entity was loaded, loaded property should be changed", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.title = "hello world";
        await connection.manager.save(post);
        // check if it was inserted correctly
        const loadedPost = await connection.manager.findOne(Post_1.Post, {
            where: {
                title: "hello world",
            },
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.loaded.should.be.equal(true);
        await connection.manager.save(loadedPost);
    })));
});
//# sourceMappingURL=mongodb-entity-change-in-subscribers.js.map