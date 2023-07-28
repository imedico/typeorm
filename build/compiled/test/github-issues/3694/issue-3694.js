"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const FruitEnum_1 = require("./enum/FruitEnum");
describe("github issues > #3694 Sync enums on schema sync", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql", "postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should change schema when enum definition changes", () => Promise.all(connections.map(async (connection) => {
        const fruitEnum = FruitEnum_1.FruitEnum;
        fruitEnum.Banana = "BANANA";
        Object.assign(fruitEnum, { Cherry: "cherry" });
        const metadata = connection.getMetadata(Post_1.Post);
        const fruitColumn = metadata.columns.find((column) => column.propertyName === "fruit");
        fruitColumn.enum = Object.keys(fruitEnum).map((key) => fruitEnum[key]);
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(table.findColumnByName("fruit").enum).to.deep.equal([
            "apple",
            "pineapple",
            "BANANA",
            "cherry",
        ]);
    })));
});
//# sourceMappingURL=issue-3694.js.map