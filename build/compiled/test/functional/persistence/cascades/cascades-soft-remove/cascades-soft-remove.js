"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Photo_1 = require("./entity/Photo");
const User_1 = require("./entity/User");
const src_1 = require("../../../../../src");
// todo: fix later
describe.skip("persistence > cascades > remove", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should soft-remove everything by cascades properly", () => Promise.all(connections.map(async (connection) => {
        await connection.manager.save(new Photo_1.Photo("Photo #1"));
        const user = new User_1.User();
        user.id = 1;
        user.name = "Mr. Cascade Danger";
        user.manyPhotos = [
            new Photo_1.Photo("one-to-many #1"),
            new Photo_1.Photo("one-to-many #2"),
        ];
        user.manyToManyPhotos = [
            new Photo_1.Photo("many-to-many #1"),
            new Photo_1.Photo("many-to-many #2"),
            new Photo_1.Photo("many-to-many #3"),
        ];
        await connection.manager.save(user);
        const loadedUser = await connection.manager
            .createQueryBuilder(User_1.User, "user")
            .leftJoinAndSelect("user.manyPhotos", "manyPhotos")
            .leftJoinAndSelect("user.manyToManyPhotos", "manyToManyPhotos")
            .getOne();
        loadedUser.id.should.be.equal(1);
        loadedUser.name.should.be.equal("Mr. Cascade Danger");
        const manyPhotoNames = loadedUser.manyPhotos.map((photo) => photo.name);
        manyPhotoNames.length.should.be.equal(2);
        manyPhotoNames.should.deep.include("one-to-many #1");
        manyPhotoNames.should.deep.include("one-to-many #2");
        const manyToManyPhotoNames = loadedUser.manyToManyPhotos.map((photo) => photo.name);
        manyToManyPhotoNames.length.should.be.equal(3);
        manyToManyPhotoNames.should.deep.include("many-to-many #1");
        manyToManyPhotoNames.should.deep.include("many-to-many #2");
        manyToManyPhotoNames.should.deep.include("many-to-many #3");
        await connection.manager.softRemove(user);
        const allPhotos = await connection.manager.findBy(Photo_1.Photo, {
            deletedAt: (0, src_1.IsNull)(),
        });
        allPhotos.length.should.be.equal(1);
        allPhotos[0].name.should.be.equal("Photo #1");
    })));
});
//# sourceMappingURL=cascades-soft-remove.js.map