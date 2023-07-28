"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Photo_1 = require("./entity/Photo");
describe("github issues > #8723 Fail on Update when reference exists together with FK: multiple assignments to same column ", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should able to update when both reference and the id exist in the update object", () => Promise.all(connections.map(async (connection) => {
        const photoRepository = connection.getRepository(Photo_1.Photo);
        const userRepository = connection.getRepository(User_1.User);
        const user = await userRepository.save({ id: 1, name: "Test" });
        const photo = await photoRepository.save({ id: 1 });
        await photoRepository.update({ id: photo.id }, { user, userId: user.id });
    })));
});
//# sourceMappingURL=issue-8723.js.map