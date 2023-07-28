"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #1584 Cannot read property 'createValueMap' of undefined", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save entities properly", () => Promise.all(connections.map(async (connection) => {
        await connection.manager.save(connection.manager.create(User_1.User, {
            name: "Timber Saw",
        }));
    })));
});
//# sourceMappingURL=issue-1584.js.map