"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
describe("entity-schema > embedded - plain-object", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.UserEntitySchema],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save entity with embedded", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(User_1.UserEntitySchema);
        const newUser = userRepository.create({
            isActive: true,
            name: {
                first: "firstName",
                last: "lastName",
            },
        });
        const savedUser = await userRepository.save(newUser);
        (0, chai_1.expect)(savedUser.name).to.contains({
            first: "firstName",
            last: "lastName",
        });
    })));
    it("should contains instance of plain object for embedded entity", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(User_1.UserEntitySchema);
        const newUser = userRepository.create({
            isActive: true,
            name: {
                first: "firstName",
                last: "lastName",
            },
        });
        const savedUser = await userRepository.save(newUser);
        (0, chai_1.expect)(savedUser.name).instanceOf(Object);
    })));
});
//# sourceMappingURL=embedded-class-instance.js.map