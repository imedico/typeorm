"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const Photo_1 = require("./entity/Photo");
const EntityPropertyNotFoundError_1 = require("../../../../src/error/EntityPropertyNotFoundError");
describe("query builder > delete", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should perform deletion correctly", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "Alex Messer";
        await connection.manager.save(user1);
        await connection
            .createQueryBuilder()
            .delete()
            .from(User_1.User)
            .where("name = :name", { name: "Alex Messer" })
            .execute();
        const loadedUser1 = await connection
            .getRepository(User_1.User)
            .findOneBy({ name: "Dima Zotov" });
        (0, chai_1.expect)(loadedUser1).to.not.exist;
        const user2 = new User_1.User();
        user2.name = "Alex Messer";
        await connection.manager.save(user2);
        await connection
            .getRepository(User_1.User)
            .createQueryBuilder("myUser")
            .delete()
            .where("name = :name", { name: "Dima Zotov" })
            .execute();
        const loadedUser2 = await connection
            .getRepository(User_1.User)
            .findOneBy({ name: "Dima Zotov" });
        (0, chai_1.expect)(loadedUser2).to.not.exist;
    })));
    it("should be able to delete entities by embed criteria", () => Promise.all(connections.map(async (connection) => {
        // save few photos
        await connection.manager.save(Photo_1.Photo, { url: "1.jpg" });
        await connection.manager.save(Photo_1.Photo, {
            url: "2.jpg",
            counters: {
                likes: 2,
                favorites: 1,
                comments: 1,
            },
        });
        await connection.manager.save(Photo_1.Photo, { url: "3.jpg" });
        // make sure photo with likes = 2 exist
        const loadedPhoto1 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ counters: { likes: 2 } });
        (0, chai_1.expect)(loadedPhoto1).to.exist;
        loadedPhoto1.should.be.eql({
            id: 2,
            url: "2.jpg",
            counters: {
                likes: 2,
                favorites: 1,
                comments: 1,
            },
        });
        // delete photo now
        await connection
            .getRepository(Photo_1.Photo)
            .createQueryBuilder("photo")
            .delete()
            .where({
            counters: {
                likes: 2,
            },
        })
            .execute();
        const loadedPhoto2 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "1.jpg" });
        (0, chai_1.expect)(loadedPhoto2).to.exist;
        const loadedPhoto3 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "2.jpg" });
        (0, chai_1.expect)(loadedPhoto3).not.to.exist;
        const loadedPhoto4 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "3.jpg" });
        (0, chai_1.expect)(loadedPhoto4).to.exist;
    })));
    it("should return correct delete result", () => Promise.all(connections.map(async (connection) => {
        // don't run test for SAP Hana as it won't return these
        if (connection.name === "sap")
            return;
        // save some users
        const user1 = new User_1.User();
        user1.name = "John Doe";
        const user2 = new User_1.User();
        user2.name = "Jane Doe";
        await connection.manager.save([user1, user2]);
        const result = await connection
            .createQueryBuilder()
            .delete()
            .from(User_1.User, "user")
            .where("name IS NOT NULL")
            .execute();
        (0, chai_1.expect)(result.affected).to.equal(2);
    })));
    it("should throw error when unknown property in where criteria", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection.manager.save(user);
        let error;
        try {
            await connection
                .createQueryBuilder()
                .delete()
                .from(User_1.User)
                .where({ unknownProp: "Alex Messer" })
                .execute();
        }
        catch (err) {
            error = err;
        }
        (0, chai_1.expect)(error).to.be.an.instanceof(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
});
//# sourceMappingURL=query-builder-delete.js.map