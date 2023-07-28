"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #948 EntityManager#save always considers a Postgres array-type field to have changed", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not produce extra query when array is updated?", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Hello Test";
        user.roles = ["admin", "user"];
        await connection.manager.save(user);
        // todo: produces update query but it should not
        await connection.manager.save(user);
    })));
});
//# sourceMappingURL=issue-948.js.map