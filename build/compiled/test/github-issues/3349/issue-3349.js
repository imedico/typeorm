"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Category_1 = require("./entity/Category");
const src_1 = require("../../../src");
const chai_1 = require("chai");
describe("github issues > #3349 Multiple where conditions with parameters", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work with query builder", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Category_1.Category);
        const category = new Category_1.Category();
        category.id = 1;
        category.myField = 2;
        await repository.save(category);
        const result = await connection
            .createQueryBuilder()
            .select("category")
            .from(Category_1.Category, "category")
            .where("category.id = :ida", { ida: 1 })
            .orWhereInIds([2])
            .orWhereInIds([3])
            .execute();
        (0, chai_1.expect)(result).lengthOf(1);
    })));
    it("should work with findOne", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Category_1.Category);
        const category = new Category_1.Category();
        category.id = 1;
        category.myField = 2;
        await repository.save(category);
        const result = await repository.findOneBy({
            id: 1,
            myField: (0, src_1.In)([2, 3]),
        });
        (0, chai_1.expect)(result).to.not.be.null;
    })));
});
//# sourceMappingURL=issue-3349.js.map