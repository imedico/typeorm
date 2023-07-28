"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = tslib_1.__importStar(require("./entity/Post"));
const PostTag_1 = tslib_1.__importStar(require("./entity/PostTag"));
const PostAttachment_1 = tslib_1.__importStar(require("./entity/PostAttachment"));
describe("github issues > #6399 Combining ManyToOne, Cascade, & Composite Primary Key causes Unique Constraint issues", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.PostSchema, PostTag_1.PostTagSchema, PostAttachment_1.PostAttachmentSchema],
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("persisting the cascading entities should succeed", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.default();
        const postTag = new PostTag_1.default();
        post.tags = [postTag];
        await connection.manager.save(post, { reload: true });
        try {
            await connection.manager.save(post);
        }
        catch (e) {
            chai_1.assert.fail(e.toString(), null, "Second save had an exception");
        }
    })));
    it("persisting the cascading entities without JoinColumn should succeed", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.default();
        const postAttachment = new PostAttachment_1.default();
        post.attachments = [postAttachment];
        await connection.manager.save(post, { reload: true });
        try {
            await connection.manager.save(post);
        }
        catch (e) {
            chai_1.assert.fail(e.toString(), null, "Second save had an exception");
        }
    })));
    it("persisting the child entity should succeed", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.default();
        await connection.manager.save(post);
        const postTag = new PostTag_1.default();
        postTag.post = post;
        await connection.manager.save(postTag, { reload: true });
        try {
            await connection.manager.save(postTag);
        }
        catch (e) {
            chai_1.assert.fail(e.toString(), null, "Second save had an exception");
        }
    })));
});
//# sourceMappingURL=issue-6416.js.map