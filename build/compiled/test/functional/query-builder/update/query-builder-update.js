"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const LimitOnUpdateNotSupportedError_1 = require("../../../../src/error/LimitOnUpdateNotSupportedError");
const Photo_1 = require("./entity/Photo");
const UpdateValuesMissingError_1 = require("../../../../src/error/UpdateValuesMissingError");
const EntityPropertyNotFoundError_1 = require("../../../../src/error/EntityPropertyNotFoundError");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("query builder > update", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should perform updation correctly", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        await connection
            .createQueryBuilder()
            .update(User_1.User)
            .set({ name: "Dima Zotov" })
            .where("name = :name", { name: "Alex Messer" })
            .execute();
        const loadedUser1 = await connection
            .getRepository(User_1.User)
            .findOneBy({ name: "Dima Zotov" });
        (0, chai_1.expect)(loadedUser1).to.exist;
        loadedUser1.name.should.be.equal("Dima Zotov");
        await connection
            .getRepository(User_1.User)
            .createQueryBuilder("myUser")
            .update()
            .set({ name: "Muhammad Mirzoev" })
            .where("name = :name", { name: "Dima Zotov" })
            .execute();
        const loadedUser2 = await connection
            .getRepository(User_1.User)
            .findOneBy({ name: "Muhammad Mirzoev" });
        (0, chai_1.expect)(loadedUser2).to.exist;
        loadedUser2.name.should.be.equal("Muhammad Mirzoev");
    })));
    it("should be able to use sql functions", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        await connection
            .createQueryBuilder()
            .update(User_1.User)
            .set({
            name: () => connection.driver.options.type === "mssql"
                ? "SUBSTRING('Dima Zotov', 1, 4)"
                : "SUBSTR('Dima Zotov', 1, 4)",
        })
            .where("name = :name", {
            name: "Alex Messer",
        })
            .execute();
        const loadedUser1 = await connection
            .getRepository(User_1.User)
            .findOneBy({ name: "Dima" });
        (0, chai_1.expect)(loadedUser1).to.exist;
        loadedUser1.name.should.be.equal("Dima");
    })));
    it("should update and escape properly", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Dima";
        user.likesCount = 1;
        await connection.manager.save(user);
        const qb = connection.createQueryBuilder();
        await qb
            .update(User_1.User)
            .set({ likesCount: () => qb.escape(`likesCount`) + " + 1" })
            // .set({ likesCount: 2 })
            .where("likesCount = 1")
            .execute();
        const loadedUser1 = await connection
            .getRepository(User_1.User)
            .findOneBy({ likesCount: 2 });
        (0, chai_1.expect)(loadedUser1).to.exist;
        loadedUser1.name.should.be.equal("Dima");
    })));
    it("should update properties inside embeds as well", () => Promise.all(connections.map(async (connection) => {
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
        // update photo now
        await connection
            .getRepository(Photo_1.Photo)
            .createQueryBuilder("photo")
            .update()
            .set({
            counters: {
                likes: 3,
            },
        })
            .where({
            counters: {
                likes: 2,
            },
        })
            .execute();
        const loadedPhoto1 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "1.jpg" });
        (0, chai_1.expect)(loadedPhoto1).to.exist;
        loadedPhoto1.should.be.eql({
            id: 1,
            url: "1.jpg",
            counters: {
                likes: 3,
                favorites: 1,
                comments: 1,
            },
        });
        const loadedPhoto2 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "2.jpg" });
        (0, chai_1.expect)(loadedPhoto2).to.exist;
        loadedPhoto2.should.be.eql({
            id: 2,
            url: "2.jpg",
            counters: {
                likes: 0,
                favorites: 1,
                comments: 1,
            },
        });
    })));
    it("should perform update with limit correctly", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "Alex Messer";
        const user2 = new User_1.User();
        user2.name = "Muhammad Mirzoev";
        const user3 = new User_1.User();
        user3.name = "Brad Porter";
        await connection.manager.save([user1, user2, user3]);
        const limitNum = 2;
        const nameToFind = "Dima Zotov";
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            await connection
                .createQueryBuilder()
                .update(User_1.User)
                .set({ name: nameToFind })
                .limit(limitNum)
                .execute();
            const loadedUsers = await connection
                .getRepository(User_1.User)
                .findBy({ name: nameToFind });
            (0, chai_1.expect)(loadedUsers).to.exist;
            loadedUsers.length.should.be.equal(limitNum);
        }
        else {
            await connection
                .createQueryBuilder()
                .update(User_1.User)
                .set({ name: nameToFind })
                .limit(limitNum)
                .execute()
                .should.be.rejectedWith(LimitOnUpdateNotSupportedError_1.LimitOnUpdateNotSupportedError);
        }
    })));
    it("should throw error when update value is missing", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        let error;
        try {
            await connection
                .createQueryBuilder()
                .update(User_1.User)
                .where("name = :name", { name: "Alex Messer" })
                .execute();
        }
        catch (err) {
            error = err;
        }
        (0, chai_1.expect)(error).to.be.an.instanceof(UpdateValuesMissingError_1.UpdateValuesMissingError);
    })));
    it("should throw error when update value is missing 2", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        let error;
        try {
            await connection
                .createQueryBuilder(User_1.User, "user")
                .update()
                .where("name = :name", { name: "Alex Messer" })
                .execute();
        }
        catch (err) {
            error = err;
        }
        (0, chai_1.expect)(error).to.be.an.instanceof(UpdateValuesMissingError_1.UpdateValuesMissingError);
    })));
    it("should throw error when update property in set method is unknown", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        let error;
        try {
            await connection
                .createQueryBuilder()
                .update(User_1.User)
                .set({ unknownProp: true })
                .where("name = :name", { name: "Alex Messer" })
                .execute();
        }
        catch (err) {
            error = err;
        }
        (0, chai_1.expect)(error).to.be.an.instanceof(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
    it("should throw error when unknown property in where criteria", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        let error;
        try {
            await connection
                .createQueryBuilder()
                .update(User_1.User)
                .set({ name: "John Doe" })
                .where({ unknownProp: "Alex Messer" })
                .execute();
        }
        catch (err) {
            error = err;
        }
        (0, chai_1.expect)(error).to.be.an.instanceof(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
});
//# sourceMappingURL=query-builder-update.js.map