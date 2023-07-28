"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Role_1 = require("./entity/Role");
describe("other issues > auto-increment id as string", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should relationIds exist", () => Promise.all(connections.map(async function (connection) {
        const role1 = new Role_1.Role();
        role1.roleName = "#role 1";
        const role2 = new Role_1.Role();
        role2.roleName = "#role 2";
        const user = new User_1.User();
        user.userName = "#user 1";
        user.roles = [
            await connection.manager.save(role1),
            await connection.manager.save(role2),
        ];
        const user2 = await connection.manager.save(user);
        const user3 = await connection.manager.findOne(User_1.User, {
            where: {
                userId: user2.userId,
            },
            loadRelationIds: true,
        });
        user3.roles.length.should.be.equal(2);
    })));
});
//# sourceMappingURL=auto-increment-id-as-string.js.map