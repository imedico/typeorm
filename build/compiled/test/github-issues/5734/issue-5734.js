"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #5734 insert([]) should not crash", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not crash on insert([])", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Post_1.Post);
        await repository.insert([]);
    })));
    it("should still work with a nonempty array", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Post_1.Post);
        await repository.insert([new Post_1.Post(1)]);
        await repository.findOneOrFail({ where: { id: 1 } });
    })));
});
//# sourceMappingURL=issue-5734.js.map