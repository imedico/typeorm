"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const product_1 = require("./entity/product");
const category_1 = require("./entity/category");
describe("github issues > #9988 RelationIdLoader reuses the same queryplanner within a transaction", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [product_1.Product, category_1.Category],
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("custom repository querybuilders within transactions returns relations for getOne() and getMany", async () => {
        await Promise.all(dataSources.map(async (dataSource) => {
            const manager = dataSource.manager;
            // Setup seed
            const categoryRepo = manager.getRepository(category_1.Category);
            const categoryOne = categoryRepo.create({ id: 1 });
            const categoryTwo = categoryRepo.create({ id: 2 });
            const productOneId = 1;
            const productTwoId = 2;
            await categoryRepo.save(categoryOne);
            await categoryRepo.save(categoryTwo);
            const options = (id) => ({
                relationLoadStrategy: "query",
                where: { id: productOneId },
                relations: { categories: true },
            });
            // Create a custom repository that uses a query builder without query planner
            // For both methods, relationLoadStrategy is set to "query", where the bug lies.
            const productRepo = dataSource.getRepository(product_1.Product).extend({
                async getOne() {
                    return this.createQueryBuilder("product")
                        .setFindOptions(options(productOneId))
                        .getOne();
                },
                async getMany() {
                    return this.createQueryBuilder("product")
                        .setFindOptions(options(productTwoId))
                        .getMany();
                },
            });
            // Creates a transaction that is shared across all the queries
            const getOneProduct = await manager.transaction(async (txnManager) => {
                const customProductRepo = txnManager.withRepository(productRepo);
                const product = customProductRepo.create({
                    id: productOneId,
                    categories: [{ id: categoryOne.id }],
                });
                await customProductRepo.save(product);
                return await customProductRepo.getOne();
            });
            (0, chai_1.expect)(getOneProduct.categories.length).to.be.eql(1);
            const getManyProduct = await manager.transaction(async (txnManager) => {
                const customProductRepo = txnManager.withRepository(productRepo);
                const product = customProductRepo.create({
                    id: productTwoId,
                    categories: [{ id: categoryOne.id }],
                });
                await customProductRepo.save(product);
                return await customProductRepo.getMany();
            });
            (0, chai_1.expect)(getManyProduct[0].categories.length).to.be.eql(1);
        }));
    });
});
//# sourceMappingURL=issue-9988.js.map