"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
describe("query builder > cache", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        cache: true,
        // cache: {
        //     type: "redis",
        //     options: {
        //         host: "localhost",
        //     }
        // }
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should cache results properly", () => Promise.all(connections.map(async (connection) => {
        // first prepare data - insert users
        const user1 = new User_1.User();
        user1.firstName = "Timber";
        user1.lastName = "Saw";
        user1.isAdmin = false;
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.firstName = "Alex";
        user2.lastName = "Messer";
        user2.isAdmin = false;
        await connection.manager.save(user2);
        const user3 = new User_1.User();
        user3.firstName = "Umed";
        user3.lastName = "Pleerock";
        user3.isAdmin = true;
        await connection.manager.save(user3);
        // select for the first time with caching enabled
        const users1 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .cache(true)
            .getMany();
        (0, chai_1.expect)(users1.length).to.be.equal(1);
        // insert new entity
        const user4 = new User_1.User();
        user4.firstName = "Bakhrom";
        user4.lastName = "Brochik";
        user4.isAdmin = true;
        await connection.manager.save(user4);
        // without cache it must return really how many there entities are
        const users2 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .getMany();
        (0, chai_1.expect)(users2.length).to.be.equal(2);
        // but with cache enabled it must not return newly inserted entity since cache is not expired yet
        const users3 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .cache(true)
            .getMany();
        (0, chai_1.expect)(users3.length).to.be.equal(1);
        // give some time for cache to expire
        await (0, test_utils_1.sleep)(1000);
        // now, when our cache has expired we check if we have new user inserted even with cache enabled
        const users4 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .cache(true)
            .getMany();
        (0, chai_1.expect)(users4.length).to.be.equal(2);
    })));
    it("should cache results with pagination enabled properly", () => Promise.all(connections.map(async (connection) => {
        // first prepare data - insert users
        const user1 = new User_1.User();
        user1.firstName = "Timber";
        user1.lastName = "Saw";
        user1.isAdmin = false;
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.firstName = "Alex";
        user2.lastName = "Messer";
        user2.isAdmin = false;
        await connection.manager.save(user2);
        const user3 = new User_1.User();
        user3.firstName = "Umed";
        user3.lastName = "Pleerock";
        user3.isAdmin = true;
        await connection.manager.save(user3);
        // select for the first time with caching enabled
        const users1 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: false })
            .skip(1)
            .take(5)
            .orderBy("user.id")
            .cache(true)
            .getMany();
        (0, chai_1.expect)(users1.length).to.be.equal(1);
        // insert new entity
        const user4 = new User_1.User();
        user4.firstName = "Bakhrom";
        user4.lastName = "Bro";
        user4.isAdmin = false;
        await connection.manager.save(user4);
        // without cache it must return really how many there entities are
        const users2 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: false })
            .skip(1)
            .take(5)
            .orderBy("user.id")
            .getMany();
        (0, chai_1.expect)(users2.length).to.be.equal(2);
        // but with cache enabled it must not return newly inserted entity since cache is not expired yet
        const users3 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: false })
            .skip(1)
            .take(5)
            .cache(true)
            .orderBy("user.id")
            .getMany();
        (0, chai_1.expect)(users3.length).to.be.equal(1);
        // give some time for cache to expire
        await (0, test_utils_1.sleep)(1000);
        // now, when our cache has expired we check if we have new user inserted even with cache enabled
        const users4 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: false })
            .skip(1)
            .take(5)
            .cache(true)
            .orderBy("user.id")
            .getMany();
        (0, chai_1.expect)(users4.length).to.be.equal(2);
    })));
    it("should cache results with custom id and duration supplied", () => Promise.all(connections.map(async (connection) => {
        // first prepare data - insert users
        const user1 = new User_1.User();
        user1.firstName = "Timber";
        user1.lastName = "Saw";
        user1.isAdmin = false;
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.firstName = "Alex";
        user2.lastName = "Messer";
        user2.isAdmin = false;
        await connection.manager.save(user2);
        const user3 = new User_1.User();
        user3.firstName = "Umed";
        user3.lastName = "Pleerock";
        user3.isAdmin = true;
        await connection.manager.save(user3);
        // select for the first time with caching enabled
        const users1 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: false })
            .skip(1)
            .take(5)
            .cache("user_admins", 2000)
            .orderBy("user.id")
            .getMany();
        (0, chai_1.expect)(users1.length).to.be.equal(1);
        // insert new entity
        const user4 = new User_1.User();
        user4.firstName = "Bakhrom";
        user4.lastName = "Bro";
        user4.isAdmin = false;
        await connection.manager.save(user4);
        // without cache it must return really how many there entities are
        const users2 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: false })
            .skip(1)
            .take(5)
            .orderBy("user.id")
            .getMany();
        (0, chai_1.expect)(users2.length).to.be.equal(2);
        // give some time for cache to expire
        await (0, test_utils_1.sleep)(1000);
        // but with cache enabled it must not return newly inserted entity since cache is not expired yet
        const users3 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: false })
            .skip(1)
            .take(5)
            .orderBy("user.id")
            .cache("user_admins", 2000)
            .getMany();
        (0, chai_1.expect)(users3.length).to.be.equal(1);
        // give some time for cache to expire
        await (0, test_utils_1.sleep)(1000);
        // now, when our cache has expired we check if we have new user inserted even with cache enabled
        const users4 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: false })
            .skip(1)
            .take(5)
            .orderBy("user.id")
            .cache("user_admins", 2000)
            .getMany();
        (0, chai_1.expect)(users4.length).to.be.equal(2);
    })));
    it("should cache results with custom id and duration supplied", () => Promise.all(connections.map(async (connection) => {
        // first prepare data - insert users
        const user1 = new User_1.User();
        user1.firstName = "Timber";
        user1.lastName = "Saw";
        user1.isAdmin = false;
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.firstName = "Alex";
        user2.lastName = "Messer";
        user2.isAdmin = false;
        await connection.manager.save(user2);
        const user3 = new User_1.User();
        user3.firstName = "Umed";
        user3.lastName = "Pleerock";
        user3.isAdmin = true;
        await connection.manager.save(user3);
        // select for the first time with caching enabled
        const users1 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .cache(true)
            .getCount();
        (0, chai_1.expect)(users1).to.be.equal(1);
        // insert new entity
        const user4 = new User_1.User();
        user4.firstName = "Bakhrom";
        user4.lastName = "Brochik";
        user4.isAdmin = true;
        await connection.manager.save(user4);
        // without cache it must return really how many there entities are
        const users2 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .getCount();
        (0, chai_1.expect)(users2).to.be.equal(2);
        // but with cache enabled it must not return newly inserted entity since cache is not expired yet
        const users3 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .cache(true)
            .getCount();
        (0, chai_1.expect)(users3).to.be.equal(1);
        // give some time for cache to expire
        await (0, test_utils_1.sleep)(1000);
        // now, when our cache has expired we check if we have new user inserted even with cache enabled
        const users4 = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .cache(true)
            .getCount();
        (0, chai_1.expect)(users4).to.be.equal(2);
    })));
});
//# sourceMappingURL=query-builder-cache.js.map