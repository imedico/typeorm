"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const Brackets_1 = require("../../../../src/query-builder/Brackets");
describe("query builder > brackets", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should put parentheses in the SQL", () => Promise.all(connections.map(async (connection) => {
        const sql = await connection
            .createQueryBuilder(User_1.User, "user")
            .where("user.isAdmin = :isAdmin", { isAdmin: true })
            .orWhere(new Brackets_1.Brackets((qb) => {
            qb.where("user.firstName = :firstName1", {
                firstName1: "Hello",
            }).andWhere("user.lastName = :lastName1", {
                lastName1: "Mars",
            });
        }))
            .orWhere(new Brackets_1.Brackets((qb) => {
            qb.where("user.firstName = :firstName2", {
                firstName2: "Hello",
            }).andWhere("user.lastName = :lastName2", {
                lastName2: "Earth",
            });
        }))
            .andWhere(new Brackets_1.Brackets((qb) => {
            qb.where("user.firstName = :firstName3 AND foo = bar", { firstName3: "Hello" });
        }))
            .disableEscaping()
            .getSql();
        (0, chai_1.expect)(sql).to.be.equal("SELECT user.id AS user_id, user.firstName AS user_firstName, " +
            "user.lastName AS user_lastName, user.isAdmin AS user_isAdmin " +
            "FROM user user " +
            "WHERE user.isAdmin = ? " +
            "OR (user.firstName = ? AND user.lastName = ?) " +
            "OR (user.firstName = ? AND user.lastName = ?) " +
            "AND (user.firstName = ? AND foo = bar)");
    })));
    it("should put brackets correctly into WHERE expression", () => Promise.all(connections.map(async (connection) => {
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
            .orWhere(new Brackets_1.Brackets((qb) => {
            qb.where("user.firstName = :firstName1", {
                firstName1: "Timber",
            }).andWhere("user.lastName = :lastName1", {
                lastName1: "Saw",
            });
        }))
            .orWhere(new Brackets_1.Brackets((qb) => {
            qb.where("user.firstName = :firstName2", {
                firstName2: "Alex",
            }).andWhere("user.lastName = :lastName2", {
                lastName2: "Messer",
            });
        }))
            .getMany();
        (0, chai_1.expect)(users.length).to.be.equal(3);
    })));
});
//# sourceMappingURL=query-builder-brackets.js.map