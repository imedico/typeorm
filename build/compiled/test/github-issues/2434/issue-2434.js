"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Item_1 = require("./entity/Item");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #2434 QueryBuilder insert for Oracle failed", () => {
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["oracle"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert multiple rows with QueryBuilder", () => Promise.all(connections.map(async (connection) => {
        const result = await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values([{ id: 5, title: "title 1" }, { id: 6 }])
            .execute();
        (0, chai_1.expect)(result.raw).to.be.equal(2);
        (0, chai_1.expect)(result.identifiers).to.deep.equal([{ id: 5 }, { id: 6 }]);
    })));
    it("should throw ORA-00001 error if constraint violated when inserting multiple rows", () => Promise.all(connections.map(async (connection) => {
        try {
            await connection
                .createQueryBuilder()
                .insert()
                .into(Post_1.Post)
                .values([{ id: 6, title: "title 3" }, { id: 6 }])
                .execute();
        }
        catch (err) {
            (0, chai_1.expect)(err.message).to.contain("ORA-00001");
        }
    })));
    it("should insert multiple rows of entity with generated columns with QueryBuilder", () => Promise.all(connections.map(async (connection) => {
        const result = await connection
            .createQueryBuilder()
            .insert()
            .into(Item_1.Item)
            .values([
            { itemName: "item name 1" },
            { itemName: "item name 2" },
        ])
            .execute();
        (0, chai_1.expect)(result.raw).to.be.equal(2);
        const items = await connection.getRepository(Item_1.Item).find();
        (0, chai_1.expect)(items.length).to.be.equal(2);
    })));
    it("should still insert one row with QueryBuilder", () => Promise.all(connections.map(async (connection) => {
        const result = await connection
            .createQueryBuilder()
            .insert()
            .into(Item_1.Item)
            .values({ itemName: "item name 20" })
            .execute();
        (0, chai_1.expect)(result.identifiers.length).to.be.equal(1);
        const items = await connection.getRepository(Item_1.Item).find();
        (0, chai_1.expect)(items[0].itemName).to.be.equal("item name 20");
    })));
    it("should still insert multiple rows with save", () => Promise.all(connections.map(async (connection) => {
        const result = await connection.getRepository(Post_1.Post).save([
            { id: 8, namedColumn: "test col 1" },
            { id: 9, title: "title id 9" },
        ]);
        (0, chai_1.expect)(result).to.deep.equal([
            { id: 8, title: null, namedColumn: "test col 1" },
            { id: 9, title: "title id 9", namedColumn: null },
        ]);
    })));
    it("should still insert one row with save", () => Promise.all(connections.map(async (connection) => {
        const result = await connection
            .getRepository(Post_1.Post)
            .save({ id: 10 });
        (0, chai_1.expect)(result).to.deep.equal({
            id: 10,
            title: null,
            namedColumn: null,
        });
    })));
});
//# sourceMappingURL=issue-2434.js.map