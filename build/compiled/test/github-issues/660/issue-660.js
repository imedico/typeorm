"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
const ReturningStatementNotSupportedError_1 = require("../../../src/error/ReturningStatementNotSupportedError");
describe("github issues > #660 Specifying a RETURNING or OUTPUT clause with QueryBuilder", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create an INSERT statement, including RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Tim Merrison";
        let sql = "";
        try {
            sql = connection
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values(user)
                .returning(connection.driver.options.type === "postgres"
                ? "*"
                : "inserted.*")
                .disableEscaping()
                .getSql();
        }
        catch (err) {
            (0, chai_1.expect)(err.message).to.eql(new ReturningStatementNotSupportedError_1.ReturningStatementNotSupportedError().message);
        }
        if (connection.driver.options.type === "mssql") {
            (0, chai_1.expect)(sql).to.equal("INSERT INTO user(name) OUTPUT inserted.* VALUES (@0)");
        }
        else if (connection.driver.options.type === "postgres") {
            (0, chai_1.expect)(sql).to.equal("INSERT INTO user(name) VALUES ($1) RETURNING *");
        }
    })));
    it("should perform insert with RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Tim Merrison";
        if (connection.driver.options.type === "mssql" ||
            connection.driver.options.type === "postgres") {
            const returning = await connection
                .createQueryBuilder()
                .insert()
                .into(User_1.User)
                .values(user)
                .returning(connection.driver.options.type === "postgres"
                ? "*"
                : "inserted.*")
                .execute();
            returning.raw.should.be.eql([{ id: 1, name: user.name }]);
        }
    })));
    it("should create an UPDATE statement, including RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Tim Merrison";
        try {
            const sql = connection
                .createQueryBuilder()
                .update(User_1.User)
                .set({ name: "Joe Bloggs" })
                .where("name = :name", { name: user.name })
                .returning(connection.driver.options.type === "postgres"
                ? "*"
                : "inserted.*")
                .disableEscaping()
                .getSql();
            if (connection.driver.options.type === "mssql") {
                (0, chai_1.expect)(sql).to.equal("UPDATE user SET name = @0 OUTPUT inserted.* WHERE name = @1");
            }
            else if (connection.driver.options.type === "postgres") {
                (0, chai_1.expect)(sql).to.equal("UPDATE user SET name = $1 WHERE name = $2 RETURNING *");
            }
        }
        catch (err) {
            (0, chai_1.expect)(err.message).to.eql(new ReturningStatementNotSupportedError_1.ReturningStatementNotSupportedError().message);
        }
    })));
    it("should perform update with RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Tim Merrison";
        await connection.manager.save(user);
        if (connection.driver.options.type === "mssql" ||
            connection.driver.options.type === "postgres") {
            const returning = await connection
                .createQueryBuilder()
                .update(User_1.User)
                .set({ name: "Joe Bloggs" })
                .where("name = :name", { name: user.name })
                .returning(connection.driver.options.type === "postgres"
                ? "*"
                : "inserted.*")
                .execute();
            returning.raw.should.be.eql([{ id: 1, name: "Joe Bloggs" }]);
        }
    })));
    it("should create a DELETE statement, including RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", () => Promise.all(connections.map(async (connection) => {
        try {
            const user = new User_1.User();
            user.name = "Tim Merrison";
            const sql = connection
                .createQueryBuilder()
                .delete()
                .from(User_1.User)
                .where("name = :name", { name: user.name })
                .returning(connection.driver.options.type === "postgres"
                ? "*"
                : "deleted.*")
                .disableEscaping()
                .getSql();
            if (connection.driver.options.type === "mssql") {
                (0, chai_1.expect)(sql).to.equal("DELETE FROM user OUTPUT deleted.* WHERE name = @0");
            }
            else if (connection.driver.options.type === "postgres") {
                (0, chai_1.expect)(sql).to.equal("DELETE FROM user WHERE name = $1 RETURNING *");
            }
        }
        catch (err) {
            (0, chai_1.expect)(err.message).to.eql(new ReturningStatementNotSupportedError_1.ReturningStatementNotSupportedError().message);
        }
    })));
    it("should perform delete with RETURNING or OUTPUT clause (PostgreSQL and MSSQL only)", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Tim Merrison";
        await connection.manager.save(user);
        if (connection.driver.options.type === "mssql" ||
            connection.driver.options.type === "postgres") {
            const returning = await connection
                .createQueryBuilder()
                .delete()
                .from(User_1.User)
                .where("name = :name", { name: user.name })
                .returning(connection.driver.options.type === "postgres"
                ? "*"
                : "deleted.*")
                .execute();
            returning.raw.should.be.eql([{ id: 1, name: user.name }]);
        }
    })));
});
//# sourceMappingURL=issue-660.js.map