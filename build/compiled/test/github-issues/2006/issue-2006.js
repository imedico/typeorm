"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #2006 Columns are being set to null after saving the entity", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to find by boolean find", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.token = "sometoken";
        await connection.manager.save(user);
        user.token.should.be.equal("sometoken");
    })));
});
//# sourceMappingURL=issue-2006.js.map