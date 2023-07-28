"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const User_1 = require("./entity/User");
describe("github issues > #1178 subqueries must work in insert statements", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work fine", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Timber Saw";
        await connection.manager.save(user);
        await connection
            .getRepository(Post_1.Post)
            .createQueryBuilder()
            .insert()
            .values({
            name: "First post",
            user: () => `(SELECT "user"."id" FROM "user" WHERE "user"."name" = :userName)`,
        })
            .setParameter("userName", "Timber Saw")
            .returning("*")
            .execute();
        await connection.manager
            .findOne(Post_1.Post, {
            where: {
                id: 1,
            },
            relations: { user: true },
        })
            .should.eventually.eql({
            id: 1,
            name: "First post",
            user: {
                id: 1,
                name: "Timber Saw",
            },
        });
    })));
});
//# sourceMappingURL=issue-1178.js.map