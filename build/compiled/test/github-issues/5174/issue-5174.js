"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
const Role_1 = require("./entity/Role");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #5174 `selectQueryBuilder.take` messes up the query when using the `ids` parameter", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [User_1.User, Role_1.Role],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should allow the 'ids' parameter without messing up the query when using .take", () => Promise.all(connections.map(async (connection) => {
        const roleRepository = connection.getRepository(Role_1.Role);
        const userRepository = connection.getRepository(User_1.User);
        const userWithId = (id) => ({ id });
        await roleRepository.save([
            { id: "a", users: [1, 2, 3].map(userWithId) },
            { id: "b", users: [9, 10, 11, 12, 13].map(userWithId) },
            { id: "c", users: [14, 15, 16, 17].map(userWithId) },
        ]);
        const results = await userRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.role", "role")
            .where("role.id IN (:...ids)", { ids: ["a", "c"] })
            .take(5)
            .orderBy("user.id")
            .getMany();
        (0, chai_1.expect)(results).to.be.deep.equal([
            { id: 1, role: { id: "a" } },
            { id: 2, role: { id: "a" } },
            { id: 3, role: { id: "a" } },
            { id: 14, role: { id: "c" } },
            { id: 15, role: { id: "c" } },
        ]);
    })));
});
//# sourceMappingURL=issue-5174.js.map