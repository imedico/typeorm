"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("github issues > #867 result of `findAndCount` is wrong when apply `skip` and `take` option", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work perfectly", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(User_1.User);
        const users = new Array(5).fill(0).map((n, i) => {
            const user = new User_1.User();
            user.username = `User_${i}`;
            return user;
        });
        await userRepository.save(users);
        const [foundUsers, totalCount] = await userRepository.findAndCount({
            skip: 1,
            take: 2,
            order: {
                username: "ASC",
            },
        });
        (0, chai_1.expect)(totalCount).to.equal(5);
        (0, chai_1.expect)(foundUsers).to.have.lengthOf(2);
        (0, chai_1.expect)(foundUsers[0].username).to.equal("User_1");
    })));
});
//# sourceMappingURL=issue-867.js.map