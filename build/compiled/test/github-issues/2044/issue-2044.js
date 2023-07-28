"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Photo_1 = require("./entity/Photo");
describe("github issues > #2044 Should not double get embedded column value", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Insert query should work with relational columns", () => Promise.all(connections.map(async (connection) => {
        let userId = "1234";
        let photoId = "4321";
        const user = new User_1.User();
        user.id = userId;
        user.age = 25;
        await connection.manager.save(user);
        const photo = new Photo_1.Photo();
        photo.id = photoId;
        photo.description = "Tall trees";
        photo.user = user;
        await connection.manager.save(photo);
        const photos = await connection.manager.find(Photo_1.Photo, {
            relations: { user: true },
        });
        const resultPhoto = photos[0];
        resultPhoto.id.should.be.eql(photoId);
        resultPhoto.user.id.should.be.eql(userId);
    })));
});
//# sourceMappingURL=issue-2044.js.map