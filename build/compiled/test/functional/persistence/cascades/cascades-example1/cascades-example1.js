"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Profile_1 = require("./entity/Profile");
const Photo_1 = require("./entity/Photo");
const User_1 = require("./entity/User");
describe("persistence > cascades > example 1", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert everything by cascades properly", () => Promise.all(connections.map(async (connection) => {
        const photo = new Photo_1.Photo();
        photo.id = 1;
        if (connection.driver.options.type === "spanner")
            photo.name = "My photo";
        const profile = new Profile_1.Profile();
        profile.id = 1;
        profile.photo = photo;
        const user = new User_1.User();
        user.id = 1;
        user.name = "Umed";
        user.profile = profile;
        await connection.manager.save(user);
        const loadedUser = await connection.manager
            .createQueryBuilder(User_1.User, "user")
            .leftJoinAndSelect("user.profile", "profile")
            .leftJoinAndSelect("profile.photo", "profilePhoto")
            .leftJoinAndSelect("profile.user", "profileUser")
            .getOne();
        loadedUser.should.be.eql({
            id: 1,
            name: "Umed",
            profile: {
                id: 1,
                photo: {
                    id: 1,
                    name: "My photo",
                },
                user: {
                    id: 1,
                    name: "Umed",
                },
            },
        });
    })));
});
//# sourceMappingURL=cascades-example1.js.map