"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #1600 Postgres: QueryBuilder insert with Postgres array type bug", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert successfully using save method", () => Promise.all(connections.map(async (connection) => {
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new User_1.User();
            user.names = ["user #" + i];
            users.push(user);
        }
        await connection.manager.save(users);
        const loadedUsers1 = await connection
            .createQueryBuilder(User_1.User, "user")
            .getMany();
        loadedUsers1.length.should.be.equal(10);
        const loadedUsers2 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.id IN (:...ids)", { ids: [1, 2, 3, 15] })
            .getMany();
        loadedUsers2.length.should.be.equal(3);
        const loadedUsers3 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.id = ANY(:ids)", { ids: [1, 2, 15] })
            .getMany();
        loadedUsers3.length.should.be.equal(2);
    })));
    it("should insert successfully using insert method", () => Promise.all(connections.map(async (connection) => {
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new User_1.User();
            user.names = ["user #" + i];
            users.push(user);
        }
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(users)
            .execute();
        const loadedUsers = await connection
            .createQueryBuilder(User_1.User, "user")
            .getMany();
        loadedUsers.length.should.be.equal(10);
    })));
});
//# sourceMappingURL=issue-1600.js.map