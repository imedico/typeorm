"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #4185 afterLoad() subscriber interface missing additional info available on other events", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should invoke afterLoad() with LoadEvent", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.id = 1;
        const post2 = new Post_1.Post();
        post2.id = 2;
        await connection.manager.save([post1, post2]);
        const entities = await connection.manager
            .getRepository(Post_1.Post)
            .find();
        chai_1.assert.strictEqual(entities.length, 2);
        for (const entity of entities) {
            chai_1.assert.isDefined(entity.simpleSubscriberSaw);
            const event = entity.extendedSubscriberSaw;
            chai_1.assert.isDefined(event);
            chai_1.assert.strictEqual(event.connection, connection);
            chai_1.assert.isDefined(event.queryRunner);
            chai_1.assert.isDefined(event.manager);
            chai_1.assert.strictEqual(event.entity, entity);
            chai_1.assert.isDefined(event.metadata);
        }
    })));
});
//# sourceMappingURL=issue-4185.js.map