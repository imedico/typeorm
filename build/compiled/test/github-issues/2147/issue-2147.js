"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
// TODO: wrong test
describe.skip("github issues > #2147 Lazy load JoinColumn with multiple columns name property is ignored for second reference column", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create multiple column join for lazy loading relationship", () => {
        return Promise.all(connections.map(async (connection) => {
            // tests go here
            const username = "user name";
            const user = new User_1.User();
            user.key = 10;
            user.clientId = 16;
            user.name = username;
            user.updatedById = 10;
            await connection.manager.save(user);
            const users = await connection.manager.find(User_1.User);
            const updatedBy = await users[0].updatedBy;
            return (0, chai_1.expect)(updatedBy.name).to.be.equal(username);
        }));
    });
});
//# sourceMappingURL=issue-2147.js.map