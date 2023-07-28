"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("other issues > ekifox reported issue with increment", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("getters and setters should work correctly", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.id = 1;
        user.nickName = "pleerock";
        await connection.manager.save(user);
        await connection.manager.update(User_1.User, { id: 1 }, {
            friendsInvitesCount: () => "friends_invites_count + 1",
        });
        const loadedUser = await connection.manager
            .createQueryBuilder(User_1.User, "user")
            .where("user.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedUser).not.to.be.null;
        loadedUser.id.should.be.equal(1);
        loadedUser.friendsInvitesCount.should.be.equal(1);
    })));
});
//# sourceMappingURL=ekifox-increment-issue.js.map