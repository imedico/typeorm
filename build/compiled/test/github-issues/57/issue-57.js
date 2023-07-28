"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
const AccessToken_1 = require("./entity/AccessToken");
describe("github issues > #57 cascade insert not working with OneToOne relationship", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // this test is no absolutely complete because cascade is now only allowed from one side of the relation
    it("should persist successfully from inverse side", () => Promise.all(connections.map(async (connection) => {
        // create
        const token = new AccessToken_1.AccessToken();
        token.expireTime = 60000;
        const user = new User_1.User();
        user.email = "mwelnick@test.com";
        user.access_token = token; // this is not necessary at all
        token.user = user; // this is necessary to cascades to work because we are saving token, not user
        // save
        await connection.getRepository(AccessToken_1.AccessToken).save(token);
        // get to check
        const tokens = await connection
            .getRepository(AccessToken_1.AccessToken)
            .createQueryBuilder("token")
            .innerJoinAndSelect("token.user", "user")
            .getMany();
        (0, chai_1.expect)(tokens).not.to.be.undefined;
        tokens.should.be.eql([
            {
                primaryKey: 1,
                expireTime: 60000,
                user: {
                    primaryKey: 1,
                    email: "mwelnick@test.com",
                },
            },
        ]);
        // get from inverse side and check
        const users = await connection
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.access_token", "token")
            .getMany();
        (0, chai_1.expect)(users).not.to.be.undefined;
        users.should.be.eql([
            {
                primaryKey: 1,
                email: "mwelnick@test.com",
                access_token: {
                    primaryKey: 1,
                    expireTime: 60000,
                },
            },
        ]);
    })));
});
//# sourceMappingURL=issue-57.js.map