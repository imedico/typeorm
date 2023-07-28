"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const User_2 = require("./entity/User");
describe("github issues > #4630 Enum string not escaping resulting in broken migrations.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["mysql", "postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should support enums of strings with apostrophes in them", () => Promise.all(connections.map(async (connection) => {
        const user = new User_2.User();
        user.realm = User_1.Realm.KelThuzad;
        await connection.manager.save(user);
        const users = await connection.manager.find(User_2.User);
        users.should.eql([
            {
                id: 1,
                realm: "Kel'Thuzad",
            },
        ]);
    })));
});
//# sourceMappingURL=issue-4630.js.map