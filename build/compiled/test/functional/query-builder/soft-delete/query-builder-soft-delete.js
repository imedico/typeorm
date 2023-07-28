"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/test-setup");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const LimitOnUpdateNotSupportedError_1 = require("../../../../src/error/LimitOnUpdateNotSupportedError");
const src_1 = require("../../../../src");
const MissingDeleteDateColumnError_1 = require("../../../../src/error/MissingDeleteDateColumnError");
const UserWithoutDeleteDate_1 = require("./entity/UserWithoutDeleteDate");
const Photo_1 = require("./entity/Photo");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("query builder > soft-delete", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should perform soft deletion and recovery correctly", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        await connection
            .createQueryBuilder()
            .softDelete()
            .from(User_1.User)
            .where("name = :name", { name: "Alex Messer" })
            .execute();
        const loadedUser1 = await connection
            .getRepository(User_1.User)
            .findOne({
            where: {
                name: "Alex Messer",
            },
            withDeleted: true,
        });
        (0, chai_1.expect)(loadedUser1).to.exist;
        (0, chai_1.expect)(loadedUser1.deletedAt).to.be.instanceof(Date);
        await connection
            .getRepository(User_1.User)
            .createQueryBuilder()
            .restore()
            .from(User_1.User)
            .where("name = :name", { name: "Alex Messer" })
            .execute();
        const loadedUser2 = await connection
            .getRepository(User_1.User)
            .findOneBy({ name: "Alex Messer" });
        (0, chai_1.expect)(loadedUser2).to.exist;
        (0, chai_1.expect)(loadedUser2.deletedAt).to.be.equals(null);
    })));
    it("should soft-delete and restore properties inside embeds as well", () => Promise.all(connections.map(async (connection) => {
        // save few photos
        await connection.manager.save(Photo_1.Photo, {
            url: "1.jpg",
            counters: {
                likes: 2,
                favorites: 1,
                comments: 1,
            },
        });
        await connection.manager.save(Photo_1.Photo, {
            url: "2.jpg",
            counters: {
                likes: 0,
                favorites: 1,
                comments: 1,
            },
        });
        // soft-delete photo now
        await connection
            .getRepository(Photo_1.Photo)
            .createQueryBuilder("photo")
            .softDelete()
            .where({
            counters: {
                likes: 2,
            },
        })
            .execute();
        const loadedPhoto1 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "1.jpg" });
        (0, chai_1.expect)(loadedPhoto1).to.be.null;
        const loadedPhoto2 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "2.jpg" });
        loadedPhoto2.should.be.eql({
            id: 2,
            url: "2.jpg",
            deletedAt: null,
            counters: {
                likes: 0,
                favorites: 1,
                comments: 1,
                deletedAt: null,
            },
        });
        // restore photo now
        await connection
            .getRepository(Photo_1.Photo)
            .createQueryBuilder("photo")
            .restore()
            .where({
            counters: {
                likes: 2,
            },
        })
            .execute();
        const restoredPhoto2 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "1.jpg" });
        restoredPhoto2.should.be.eql({
            id: 1,
            url: "1.jpg",
            deletedAt: null,
            counters: {
                likes: 2,
                favorites: 1,
                comments: 1,
                deletedAt: null,
            },
        });
    })));
    it("should perform soft delete with limit correctly", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "Alex Messer";
        const user2 = new User_1.User();
        user2.name = "Muhammad Mirzoev";
        const user3 = new User_1.User();
        user3.name = "Brad Porter";
        await connection.manager.save([user1, user2, user3]);
        const limitNum = 2;
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            await connection
                .createQueryBuilder()
                .softDelete()
                .from(User_1.User)
                .limit(limitNum)
                .execute();
            const loadedUsers = await connection
                .getRepository(User_1.User)
                .find({
                where: {
                    deletedAt: (0, src_1.Not)((0, src_1.IsNull)()),
                },
                withDeleted: true,
            });
            (0, chai_1.expect)(loadedUsers).to.exist;
            loadedUsers.length.should.be.equal(limitNum);
        }
        else {
            await connection
                .createQueryBuilder()
                .softDelete()
                .from(User_1.User)
                .limit(limitNum)
                .execute()
                .should.be.rejectedWith(LimitOnUpdateNotSupportedError_1.LimitOnUpdateNotSupportedError);
        }
    })));
    it("should perform restory with limit correctly", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "Alex Messer";
        const user2 = new User_1.User();
        user2.name = "Muhammad Mirzoev";
        const user3 = new User_1.User();
        user3.name = "Brad Porter";
        await connection.manager.save([user1, user2, user3]);
        const limitNum = 2;
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            await connection
                .createQueryBuilder()
                .softDelete()
                .from(User_1.User)
                .execute();
            await connection
                .createQueryBuilder()
                .restore()
                .from(User_1.User)
                .limit(limitNum)
                .execute();
            const loadedUsers = await connection
                .getRepository(User_1.User)
                .find();
            (0, chai_1.expect)(loadedUsers).to.exist;
            loadedUsers.length.should.be.equal(limitNum);
        }
        else {
            await connection
                .createQueryBuilder()
                .restore()
                .from(User_1.User)
                .limit(limitNum)
                .execute()
                .should.be.rejectedWith(LimitOnUpdateNotSupportedError_1.LimitOnUpdateNotSupportedError);
        }
    })));
    it("should throw error when delete date column is missing", () => Promise.all(connections.map(async (connection) => {
        const user = new UserWithoutDeleteDate_1.UserWithoutDeleteDate();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        let error1;
        try {
            await connection
                .createQueryBuilder()
                .softDelete()
                .from(UserWithoutDeleteDate_1.UserWithoutDeleteDate)
                .where("name = :name", { name: "Alex Messer" })
                .execute();
        }
        catch (err) {
            error1 = err;
        }
        (0, chai_1.expect)(error1).to.be.an.instanceof(MissingDeleteDateColumnError_1.MissingDeleteDateColumnError);
        let error2;
        try {
            await connection
                .createQueryBuilder()
                .restore()
                .from(UserWithoutDeleteDate_1.UserWithoutDeleteDate)
                .where("name = :name", { name: "Alex Messer" })
                .execute();
        }
        catch (err) {
            error2 = err;
        }
        (0, chai_1.expect)(error2).to.be.an.instanceof(MissingDeleteDateColumnError_1.MissingDeleteDateColumnError);
    })));
    it("should find with soft deleted relations", () => Promise.all(connections.map(async (connection) => {
        const photoRepository = connection.getRepository(Photo_1.Photo);
        const userRepository = connection.getRepository(User_1.User);
        const photo1 = new Photo_1.Photo();
        photo1.url = "image-1.jpg";
        const photo2 = new Photo_1.Photo();
        photo2.url = "image-2.jpg";
        const user1 = new User_1.User();
        user1.name = "user-1";
        user1.picture = photo1;
        const user2 = new User_1.User();
        user2.name = "user-2";
        user2.picture = photo2;
        await photoRepository.save(photo1);
        await photoRepository.save(photo2);
        await userRepository.save(user1);
        await userRepository.save(user2);
        const users = await userRepository.find({
            relations: { picture: true },
        });
        (0, chai_1.expect)(users[0].picture.deletedAt).to.equal(null);
        (0, chai_1.expect)(users[1].picture.deletedAt).to.equal(null);
        await photoRepository.softDelete({
            id: photo1.id,
        });
        const usersWithSoftDelete = await userRepository.find({
            withDeleted: true,
            relations: { picture: true },
        });
        (0, chai_1.expect)(usersWithSoftDelete[0].picture.deletedAt).to.not.equal(null);
        (0, chai_1.expect)(usersWithSoftDelete[1].picture.deletedAt).to.equal(null);
    })));
});
//# sourceMappingURL=query-builder-soft-delete.js.map