"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const NotBrackets_1 = require("../../../../src/query-builder/NotBrackets");
describe("query builder > not", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should put negation in the SQL with one condition", () => Promise.all(connections.map(async (connection) => {
        const sql = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .andWhere(new NotBrackets_1.NotBrackets((qb) => {
            qb.where("user.firstName = :firstName1", {
                firstName1: "Hello",
            });
        }))
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.be.equal("SELECT user.id AS user_id, user.firstName AS user_firstName, " +
            "user.lastName AS user_lastName, user.isAdmin AS user_isAdmin " +
            "FROM user user " +
            "WHERE user.isAdmin = ? " +
            "AND NOT(user.firstName = ?)");
    })));
    it("should put negation in the SQL with two condition", () => Promise.all(connections.map(async (connection) => {
        const sql = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .andWhere(new NotBrackets_1.NotBrackets((qb) => {
            qb.where("user.firstName = :firstName1", {
                firstName1: "Hello",
            }).andWhere("user.lastName = :lastName1", {
                lastName1: "Mars",
            });
        }))
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.be.equal("SELECT user.id AS user_id, user.firstName AS user_firstName, " +
            "user.lastName AS user_lastName, user.isAdmin AS user_isAdmin " +
            "FROM user user " +
            "WHERE user.isAdmin = ? " +
            "AND NOT((user.firstName = ? AND user.lastName = ?))");
    })));
    it("should put negation correctly into WHERE expression with one condition", () => Promise.all(connections.map(async (connection) => {
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
        const users = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .andWhere(new NotBrackets_1.NotBrackets((qb) => {
            qb.where("user.firstName = :firstName1", {
                firstName1: "Timber",
            });
        }))
            .getMany();
        (0, chai_1.expect)(users.length).to.be.equal(1);
    })));
    it("should put negation correctly into WHERE expression with two conditions", () => Promise.all(connections.map(async (connection) => {
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
        const users = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .andWhere(new NotBrackets_1.NotBrackets((qb) => {
            qb.where("user.firstName = :firstName1", {
                firstName1: "Timber",
            }).andWhere("user.lastName = :lastName1", {
                lastName1: "Saw",
            });
        }))
            .getMany();
        (0, chai_1.expect)(users.length).to.be.equal(1);
    })));
});
//# sourceMappingURL=query-builder-not.js.map