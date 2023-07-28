"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("../8796/entity/User");
describe("github issues > #8796 New find select object api should support false values as expected", () => {
    let connections;
    const user = {
        id: 1,
        firstName: "Christian",
        lastName: "Fleury",
        github: "chfleury",
    };
    const expectedUser = {
        id: 1,
        firstName: "Christian",
    };
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should suport false value when selecting fields", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(User_1.User);
        await userRepository.save(user);
        const foundUser = await userRepository.find({
            where: { id: 1 },
            select: {
                id: true,
                firstName: true,
                lastName: undefined,
                github: false,
            },
        });
        (0, chai_1.expect)(foundUser[0]).to.deep.equal(expectedUser);
    })));
});
//# sourceMappingURL=issue-8796.js.map