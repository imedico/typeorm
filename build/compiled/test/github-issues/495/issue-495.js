"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Item_1 = require("./entity/Item");
const User_1 = require("./entity/User");
describe("github issues > #495 Unable to set multi-column indices", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should successfully create indices and save an object", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "stonecold";
        const item = new Item_1.Item();
        item.userData = user;
        item.mid = 1;
        await connection.manager.save(user);
        await connection.manager.save(item);
    })));
});
//# sourceMappingURL=issue-495.js.map