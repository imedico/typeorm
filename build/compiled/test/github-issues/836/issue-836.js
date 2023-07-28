"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const UserCredential_1 = require("./entity/UserCredential");
describe("github issues > #836 .save won't update entity when it contains OneToOne relationship", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work perfectly", () => Promise.all(connections.map(async (connection) => {
        // just insert another dummy user
        const user1 = new User_1.User();
        user1.email = "user1@user.com";
        user1.username = "User 1";
        user1.privilege = 0;
        await connection.manager.save(user1);
        // create a user but do not insert it
        const user2 = new User_1.User();
        user2.email = "user2@user.com";
        user2.username = "User 2";
        user2.privilege = 0;
        // now create credentials and let user to be saved by cascades
        const credential = new UserCredential_1.UserCredential();
        credential.password = "ABC";
        credential.salt = "CDE";
        credential.user = user2;
        await connection.manager.save(credential);
        // check if credentials and user are saved properly
        const loadedCredentials = await connection.manager.findOne(UserCredential_1.UserCredential, {
            where: {
                id: 2,
            },
            relations: {
                user: true,
            },
        });
        loadedCredentials.should.be.eql({
            id: 2,
            user: {
                id: 2,
                email: "user2@user.com",
                username: "User 2",
                privilege: 0,
            },
            password: "ABC",
            salt: "CDE",
        });
    })));
});
//# sourceMappingURL=issue-836.js.map