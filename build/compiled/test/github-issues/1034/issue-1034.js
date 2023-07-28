"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Circle_1 = require("./entity/Circle");
const chai_1 = require("chai");
describe("github issues > #1034 Issue using setter with promises", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"], // we are using lazy relations that's why we are using a single driver
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should set members in circle", () => Promise.all(connections.map(async (connection) => {
        const users = [];
        const user = new User_1.User();
        user.setId("1");
        const circle = new Circle_1.Circle();
        circle.setId("1");
        // Entities persistance
        await connection.manager.save(user);
        await connection.manager.save(circle);
        users.push(user);
        const circleFromDB = await connection.manager.findOneById(Circle_1.Circle, circle.getId());
        (0, chai_1.expect)(circleFromDB).is.not.null;
        // Setting users with setter
        circleFromDB.setUsers(Promise.resolve(users));
        await Promise.resolve(); // this is unpleasant way to fix this issue
        (0, chai_1.expect)(users).deep.equal(await circleFromDB.getUsers());
    })));
});
//# sourceMappingURL=issue-1034.js.map