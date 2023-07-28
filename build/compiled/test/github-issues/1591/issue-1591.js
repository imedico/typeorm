"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Photo_1 = require("./entity/Photo");
describe.skip("github issues > #1591 Define order of relation data when querying on the main entity", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should query correct number of users with joined data ordering applied", () => Promise.all(connections.map(async (connection) => {
        for (let i = 0; i < 30; i++) {
            const photo1 = new Photo_1.Photo();
            photo1.name = "Photo #" + i + "_1";
            photo1.date = new Date(2018, 0, i);
            await connection.manager.save(photo1);
            const photo2 = new Photo_1.Photo();
            photo2.name = "Photo #" + i + "_1";
            photo2.date = new Date(2016, 0, i);
            await connection.manager.save(photo2);
            const user = new User_1.User();
            user.name = "User #" + i;
            user.photos = [photo1, photo2];
            await connection.manager.save(user);
        }
        await connection
            .createQueryBuilder(User_1.User, "user")
            .leftJoinAndSelect("user.photos", "photo")
            .orderBy("user.name")
            .addOrderBy("photo.date")
            .skip(0)
            .take(5)
            .getMany();
    })));
});
//# sourceMappingURL=issue-1591.js.map