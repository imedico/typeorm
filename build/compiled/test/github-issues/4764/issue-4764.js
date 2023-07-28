"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Cart_1 = require("./entity/Cart");
const CartItems_1 = require("./entity/CartItems");
describe("mssql > add lock clause for MSSQL select with join clause", () => {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    // connect to db
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["mssql"],
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should not have Lock clause", () => Promise.all(connections.map(async (connection) => {
        const lock = " WITH (NOLOCK)";
        const selectQuery = connection
            .createQueryBuilder()
            .select("cart")
            .from(Cart_1.Cart, "cart")
            .where("1=1")
            .getQuery();
        // console.log(selectQuery)
        (0, chai_1.expect)(selectQuery.includes(lock)).not.to.equal(true);
        await connection.query(selectQuery);
    })));
    it("should have WITH (NOLOCK) clause", () => Promise.all(connections.map(async (connection) => {
        const lock = " WITH (NOLOCK)";
        const selectQuery = connection
            .createQueryBuilder()
            .select("cart")
            .from(Cart_1.Cart, "cart")
            .setLock("dirty_read")
            .where("1=1")
            .getQuery();
        // console.log(selectQuery)
        (0, chai_1.expect)(selectQuery.includes(lock)).to.equal(true);
        await connection.query(selectQuery);
    })));
    it("should have two WITH (NOLOCK) clause", () => Promise.all(connections.map(async (connection) => {
        const lock = " WITH (NOLOCK)";
        const selectQuery = connection
            .createQueryBuilder()
            .select("cart")
            .from(Cart_1.Cart, "cart")
            .innerJoinAndSelect("cart.CartItems", "cartItems")
            .setLock("dirty_read")
            .where("1=1")
            .getQuery();
        // console.log(selectQuery)
        (0, chai_1.expect)(countInstances(selectQuery, lock)).to.equal(2);
        await connection.query(selectQuery);
    })));
    it("should have three WITH (NOLOCK) clause", () => Promise.all(connections.map(async (connection) => {
        const lock = " WITH (NOLOCK)";
        const selectQuery = connection
            .createQueryBuilder()
            .select("cart")
            .from(Cart_1.Cart, "cart")
            .innerJoinAndSelect("cart.User", "user")
            .innerJoinAndSelect("cart.CartItems", "cartItems")
            .setLock("dirty_read")
            .where("1=1")
            .getQuery();
        // console.log(selectQuery)
        (0, chai_1.expect)(countInstances(selectQuery, lock)).to.equal(3);
        await connection.query(selectQuery);
    })));
    it("should have three WITH (NOLOCK) clause (without relation)", () => Promise.all(connections.map(async (connection) => {
        const lock = " WITH (NOLOCK)";
        const selectQuery = connection
            .createQueryBuilder()
            .select("cart")
            .from(Cart_1.Cart, "cart")
            .innerJoin(User_1.User, "user", "user.ID=cart.UNID")
            .innerJoin(CartItems_1.CartItems, "cartItems", "cart.ID=cartItems.CartID")
            .setLock("dirty_read")
            .where("cart.ID=1")
            .getQuery();
        // console.log(selectQuery)
        (0, chai_1.expect)(countInstances(selectQuery, lock)).to.equal(3);
        await connection.query(selectQuery);
    })));
    it("should have WITH (HOLDLOCK, ROWLOCK) clause", () => Promise.all(connections.map(async (connection) => {
        const lock = " WITH (HOLDLOCK, ROWLOCK)";
        const selectQuery = connection
            .createQueryBuilder()
            .select("cart")
            .from(Cart_1.Cart, "cart")
            .setLock("pessimistic_read")
            .where("1=1")
            .getQuery();
        // console.log(selectQuery)
        (0, chai_1.expect)(selectQuery.includes(lock)).to.equal(true);
        await connection.query(selectQuery);
    })));
    it("should have WITH (UPLOCK, ROWLOCK) clause", () => Promise.all(connections.map(async (connection) => {
        const lock = " WITH (UPDLOCK, ROWLOCK)";
        const selectQuery = connection
            .createQueryBuilder()
            .select("cart")
            .from(Cart_1.Cart, "cart")
            .setLock("pessimistic_write")
            .where("1=1")
            .getQuery();
        // console.log(selectQuery)
        (0, chai_1.expect)(selectQuery.includes(lock)).to.equal(true);
        await connection.query(selectQuery);
    })));
    it("should have two WITH (UPDLOCK, ROWLOCK) clause", () => Promise.all(connections.map(async (connection) => {
        const lock = " WITH (UPDLOCK, ROWLOCK)";
        const selectQuery = connection
            .createQueryBuilder()
            .select("cart")
            .from(Cart_1.Cart, "cart")
            .innerJoinAndSelect("cart.CartItems", "cartItems")
            .setLock("pessimistic_write")
            .where("1=1")
            .getQuery();
        // console.log(selectQuery)
        (0, chai_1.expect)(countInstances(selectQuery, lock)).to.equal(2);
        await connection.query(selectQuery);
    })));
    function countInstances(str, word) {
        return str.split(word).length - 1;
    }
});
//# sourceMappingURL=issue-4764.js.map