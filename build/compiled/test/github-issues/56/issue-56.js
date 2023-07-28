"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
const AccessToken_1 = require("./entity/AccessToken");
describe.skip("github issues > #56 relationships only work when both primary keys have the same name", () => {
    // skipped because of CI error. todo: needs investigation
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully and return persisted entity", () => Promise.all(connections.map(async (connection) => {
        const token = new AccessToken_1.AccessToken();
        token.access_token = "12345";
        const user = new User_1.User();
        user.email = "mwelnick@test.com";
        user.access_token = token;
        return connection
            .getRepository(AccessToken_1.AccessToken)
            .save(token)
            .then((token) => {
            return connection.getRepository(User_1.User).save(user);
        })
            .then((user) => {
            (0, chai_1.expect)(user).not.to.be.undefined;
            user.should.be.eql({
                id: 1,
                email: "mwelnick@test.com",
                access_token: {
                    access_token: "12345",
                },
            });
        });
    })));
});
//# sourceMappingURL=issue-56.js.map