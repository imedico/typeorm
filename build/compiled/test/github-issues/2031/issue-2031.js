"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Photo_1 = require("./entity/Photo");
describe("github issues > #2031 Advanced find options with FKs", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("find operators should work with relational columns as well", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.age = 25;
        await connection.manager.save(user);
        const photo = new Photo_1.Photo();
        photo.description = "Tall trees";
        photo.uri = "www.pictures.pic/1";
        photo.userId = user.id;
        await connection.manager.save(photo);
        const photos = await connection.manager.find(Photo_1.Photo, {
            where: { userId: (0, src_1.Equal)(user.id) },
        });
        photos.should.be.eql([
            {
                id: 1,
                description: "Tall trees",
                uri: "www.pictures.pic/1",
                userId: 1,
            },
        ]);
    })));
});
//# sourceMappingURL=issue-2031.js.map