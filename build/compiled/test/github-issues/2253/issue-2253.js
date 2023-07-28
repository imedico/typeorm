"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("github issues > #2253 - inserting multiple child entities fails", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to save multiple child entities", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.SubUser();
        user1.id = 1;
        const user2 = new User_1.SubUser();
        user2.id = 2;
        await connection.manager.save([user1, user2]);
        const users = connection.getRepository(User_1.SubUser);
        (0, chai_1.expect)(await users.count()).to.eql(2);
    })));
});
//# sourceMappingURL=issue-2253.js.map