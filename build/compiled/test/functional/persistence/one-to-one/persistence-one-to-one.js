"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
const AccessToken_1 = require("./entity/AccessToken");
const test_utils_1 = require("../../../utils/test-utils");
describe("persistence > one-to-one", function () {
    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------
    let connections;
    before(() => {
        return (0, test_utils_1.createTestingConnections)({
            entities: [User_1.User, AccessToken_1.AccessToken],
        }).then((all) => (connections = all));
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    describe("set the relation with proper item", function () {
        it("should have an access token", () => Promise.all(connections.map(async (connection) => {
            const userRepository = connection.getRepository(User_1.User);
            const accessTokenRepository = connection.getRepository(AccessToken_1.AccessToken);
            const newUser = userRepository.create();
            newUser.email = "mwelnick@test.com";
            await userRepository.save(newUser);
            const newAccessToken = accessTokenRepository.create();
            newAccessToken.user = newUser;
            await accessTokenRepository.save(newAccessToken);
            const loadedUser = await userRepository.findOne({
                where: { email: "mwelnick@test.com" },
                relations: { access_token: true },
            });
            (0, chai_1.expect)(loadedUser).not.to.be.null;
            (0, chai_1.expect)(loadedUser.access_token).not.to.be.undefined;
        })));
    });
    describe("doesn't allow the same relation to be used twice", function () {
        it("should reject the saving attempt", () => Promise.all(connections.map(async (connection) => {
            const userRepository = connection.getRepository(User_1.User);
            const accessTokenRepository = connection.getRepository(AccessToken_1.AccessToken);
            const newUser = userRepository.create();
            newUser.email = "mwelnick@test.com";
            await userRepository.save(newUser);
            const newAccessToken1 = accessTokenRepository.create();
            newAccessToken1.user = newUser;
            await accessTokenRepository.save(newAccessToken1);
            const newAccessToken2 = accessTokenRepository.create();
            newAccessToken2.user = newUser;
            let error = null;
            try {
                await accessTokenRepository.save(newAccessToken2);
            }
            catch (err) {
                error = err;
            }
            (0, chai_1.expect)(error).to.be.instanceof(Error);
            (0, chai_1.expect)(await userRepository.count({})).to.equal(1);
            (0, chai_1.expect)(await accessTokenRepository.count({})).to.equal(1);
        })));
    });
});
//# sourceMappingURL=persistence-one-to-one.js.map