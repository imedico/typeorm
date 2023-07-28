"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #2287 - QueryBuilder IN and ANY Fail with .where - Postgres", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should allow to explicitly insert primary key value", () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.skill_id_array = [1, 2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.skill_id_array = [2];
        await connection.manager.save(post2);
        const result1 = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post") // you shall assign an alias
            .where(":id = ANY(post.skill_id_array)", { id: 1 }) // and use that alias everywhere in your query builder
            .getMany();
        result1.should.be.eql([{ id: 1, skill_id_array: [1, 2] }]);
        const result2 = await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder("post") // you shall assign an alias
            .where(":id = ANY(post.skill_id_array)", { id: 2 }) // and use that alias everywhere in your query builder
            .getMany();
        result2.should.be.eql([
            { id: 1, skill_id_array: [1, 2] },
            { id: 2, skill_id_array: [2] },
        ]);
    })));
});
//# sourceMappingURL=issue-2287.js.map