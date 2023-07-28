"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #6327 softRemove DeleteDateColumn is null at Susbscriber's AfterUpdate method", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should send correct update and delete date columns to after update subscriber", () => Promise.all(connections.map(async (connection) => {
        const manager = connection.manager;
        const entity = new Post_1.Post();
        await manager.save(entity);
        const deletedEntity = await manager.softRemove(entity, {
            data: { action: "soft-delete" },
        });
        await manager.recover(deletedEntity, {
            data: { action: "restore" },
        });
    })));
});
//# sourceMappingURL=issue-6327.js.map