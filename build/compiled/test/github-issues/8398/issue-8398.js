"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #8398 Separate update event into the update, soft remove and restore events", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should trigger different events for update, soft remove, and recover", () => Promise.all(connections.map(async (connection) => {
        const manager = connection.manager;
        const post = new Post_1.Post();
        post.data = "insert";
        await manager.save(post);
        post.data = "update";
        await manager.save(post);
        await manager.softRemove(post);
        const entity = await manager.recover(post);
        // Check if update listeners and subscribers are called only ones
        (0, chai_1.expect)(entity.beforeUpdateListener).to.be.eq(1);
        (0, chai_1.expect)(entity.afterUpdateListener).to.be.eq(1);
        (0, chai_1.expect)(entity.beforeUpdateSubscriber).to.be.eq(1);
        (0, chai_1.expect)(entity.afterUpdateSubscriber).to.be.eq(1);
        // Check if soft remove listeners and subscribers are called only ones
        (0, chai_1.expect)(entity.beforeSoftRemoveListener).to.be.eq(1);
        (0, chai_1.expect)(entity.afterSoftRemoveListener).to.be.eq(1);
        (0, chai_1.expect)(entity.beforeSoftRemoveSubscriber).to.be.eq(1);
        (0, chai_1.expect)(entity.afterSoftRemoveSubscriber).to.be.eq(1);
        // Check if recover listeners and subscribers are called only ones
        (0, chai_1.expect)(entity.beforeRecoverListener).to.be.eq(1);
        (0, chai_1.expect)(entity.afterRecoverListener).to.be.eq(1);
        (0, chai_1.expect)(entity.beforeRecoverSubscriber).to.be.eq(1);
        (0, chai_1.expect)(entity.afterRecoverSubscriber).to.be.eq(1);
    })));
});
//# sourceMappingURL=issue-8398.js.map