"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
describe("github issues > #4096 SQLite support for orUpdate", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User],
        enabledDrivers: ["sqlite", "better-sqlite3"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should overwrite using current value in SQLite", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.email = "example@example.org";
        user1.username = "example";
        user1.bio = "My bio";
        const user2 = new User_1.User();
        user2.email = "example@example.org";
        user2.username = "example";
        user2.bio = "Updated bio";
        const UserRepository = connection.manager.getRepository(User_1.User);
        await UserRepository.createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user1)
            .execute();
        await UserRepository.createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user2)
            .orUpdate(["bio"], ["email", "username"])
            .execute();
        const users = await UserRepository.find();
        (0, chai_1.expect)(users).not.to.be.undefined;
        (0, chai_1.expect)(users).to.have.lengthOf(1);
        (0, chai_1.expect)(users[0]).to.includes({ bio: "Updated bio" });
    })));
});
//# sourceMappingURL=issue-4096.js.map