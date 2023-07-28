"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #2005", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "better-sqlite3"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to find by boolean find", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.activated = true;
        await connection.manager.save(user);
        user.activated.should.be.equal(true);
    })));
});
//# sourceMappingURL=issue-2005.js.map