"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const user_1 = require("./entity/user");
describe("github issues > #953 MySQL 5.7 JSON column parse", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should retrieve record from mysql5.7 using driver mysql2", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getRepository(user_1.User);
        let newUser = new user_1.User();
        newUser.username = "admin";
        newUser.password = "admin";
        newUser.roles = ["admin"];
        newUser.lastLoginAt = new Date();
        let user = repo.create(newUser);
        await repo.save(user);
        let user1 = await repo.findOneBy({ username: "admin" });
        (0, chai_1.expect)(user1)
            .has.property("roles")
            .with.is.an("array")
            .and.contains("admin");
    })));
});
//# sourceMappingURL=issue-953.js.map