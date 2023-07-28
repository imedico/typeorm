"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const SpecificUser_1 = require("./entity/SpecificUser");
const chai_1 = require("chai");
describe("github issue > #1326 Wrong behavior w/ the same table names in different databases", () => {
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not confuse equivalent table names in different databases", () => Promise.all(connections.map(async (connection) => {
        for (let i = 1; i <= 10; i++) {
            const user = new User_1.User();
            user.name = "user #" + i;
            await connection.manager.save(user);
        }
        for (let i = 1; i <= 10; i++) {
            const user = new SpecificUser_1.SpecificUser();
            user.name = "specific user #" + i;
            await connection.manager.save(user);
        }
        const user = await connection.manager.findOneBy(User_1.User, {
            name: "user #1",
        });
        (0, chai_1.expect)(user).not.to.be.null;
        user.should.be.eql({
            id: 1,
            name: "user #1",
        });
        const specificUser = await connection.manager.findOneBy(SpecificUser_1.SpecificUser, { name: "specific user #1" });
        (0, chai_1.expect)(specificUser).not.to.be.null;
        specificUser.should.be.eql({
            id: 1,
            name: "specific user #1",
        });
    })));
});
//# sourceMappingURL=issue-1326.js.map