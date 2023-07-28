"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
describe("github issues > #9948 Subscribers with both 'beforeUpdate' and 'afterUpdate' methods defined cause duplicate 'updatedColumn' entries", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should not duplicate update column", () => Promise.all(dataSources.map(async (dataSource) => {
        const manager = dataSource.manager;
        const initialPost = new Post_1.Post();
        initialPost.name = "post-init";
        await manager.save(initialPost);
        initialPost.name = "post-update";
        const updatedPost = await manager.save(initialPost);
        (0, chai_1.expect)(updatedPost.updatedNameColumnsCount).to.be.eq(1);
    })));
});
//# sourceMappingURL=issue-9948.js.map