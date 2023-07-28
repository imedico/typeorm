"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #704 Table alias in WHERE clause is not quoted in PostgreSQL", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return user by a given email and proper escape 'user' keyword", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.email = "john@example.com";
        await connection.manager.save(user);
        const loadedUser = await connection
            .getRepository(User_1.User)
            .findOneBy({ email: "john@example.com" });
        loadedUser.id.should.be.equal(1);
        loadedUser.email.should.be.equal("john@example.com");
    })));
});
//# sourceMappingURL=issue-704.js.map