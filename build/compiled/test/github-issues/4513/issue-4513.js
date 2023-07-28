"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #4513 CockroachDB support for onConflict", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["cockroachdb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert if no conflict", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "example";
        user1.email = "example@example.com";
        user1.age = 30;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user1)
            .execute();
        const user2 = new User_1.User();
        user2.name = "example2";
        user2.email = "example2@example.com";
        user2.age = 42;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user2)
            .onConflict(`("name", "email") DO NOTHING`)
            .execute();
        await connection.manager
            .find(User_1.User)
            .should.eventually.have.lengthOf(2);
    })));
    it("should update on conflict with do update", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "example";
        user1.email = "example@example.com";
        user1.age = 30;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user1)
            .execute();
        const user2 = new User_1.User();
        user2.name = "example";
        user2.email = "example@example.com";
        user2.age = 42;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user2)
            .onConflict(`("name", "email") DO UPDATE SET age = EXCLUDED.age`)
            .execute();
        await connection.manager
            .findOneBy(User_1.User, {
            name: "example",
            email: "example@example.com",
        })
            .should.eventually.be.eql({
            name: "example",
            email: "example@example.com",
            age: 42,
        });
    })));
    it("should not update on conflict with do nothing", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "example";
        user1.email = "example@example.com";
        user1.age = 30;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user1)
            .execute();
        const user2 = new User_1.User();
        user2.name = "example";
        user2.email = "example@example.com";
        user2.age = 42;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user2)
            .onConflict(`("name", "email") DO NOTHING`)
            .execute();
        await connection.manager
            .findOneBy(User_1.User, {
            name: "example",
            email: "example@example.com",
        })
            .should.eventually.be.eql({
            name: "example",
            email: "example@example.com",
            age: 30,
        });
    })));
    it("should update with orUpdate", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "example";
        user1.email = "example@example.com";
        user1.age = 30;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user1)
            .execute();
        const user2 = new User_1.User();
        user2.name = "example";
        user2.email = "example@example.com";
        user2.age = 42;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user2)
            .orUpdate(["age"], ["name", "email"])
            .execute();
        await connection.manager
            .findOneBy(User_1.User, {
            name: "example",
            email: "example@example.com",
        })
            .should.eventually.be.eql({
            name: "example",
            email: "example@example.com",
            age: 42,
        });
    })));
});
//# sourceMappingURL=issue-4513.js.map