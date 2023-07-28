"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Product_1 = require("./entity/Product");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #1929 Select attributes in Find method - mongodb", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Product_1.Product],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("return column on include in select on find", () => Promise.all(connections.map(async (connection) => {
        const productRepository = connection.getMongoRepository(Product_1.Product);
        let product = new Product_1.Product("test1", "label1", 10);
        await productRepository.save(product);
        product = new Product_1.Product("test2", "label2", 20);
        await productRepository.save(product);
        product = new Product_1.Product("test3", "label3", 30);
        await productRepository.save(product);
        await productRepository.find({
            select: { name: true, label: true },
            order: { name: 1 },
        });
    })));
    it("return column on include in select on findAndCount", () => Promise.all(connections.map(async (connection) => {
        const productRepository = connection.getMongoRepository(Product_1.Product);
        let product = new Product_1.Product("test1", "label1", 10);
        await productRepository.save(product);
        product = new Product_1.Product("test2", "label2", 20);
        await productRepository.save(product);
        product = new Product_1.Product("test3", "label3", 30);
        await productRepository.save(product);
        await productRepository.findAndCount({
            select: { name: true, label: true },
            order: { name: 1 },
        });
    })));
    it("return column on include in select on findByIds", () => Promise.all(connections.map(async (connection) => {
        const productRepository = connection.getMongoRepository(Product_1.Product);
        let product = new Product_1.Product("test1", "label1", 10);
        await productRepository.save(product);
        product = new Product_1.Product("test2", "label2", 20);
        await productRepository.save(product);
        product = new Product_1.Product("test3", "label3", 30);
        const product3 = await productRepository.save(product);
        await productRepository.find({
            where: { _id: product3.id },
            select: { name: true, label: true },
            order: { name: 1 },
        });
    })));
    it("return column on include in select on findByIds ", () => Promise.all(connections.map(async (connection) => {
        const productRepository = connection.getMongoRepository(Product_1.Product);
        let product = new Product_1.Product("test1", "label1", 10);
        await productRepository.save(product);
        product = new Product_1.Product("test2", "label2", 20);
        await productRepository.save(product);
        product = new Product_1.Product("test3", "label3", 30);
        await productRepository.findOne({
            where: { name: "test2" },
            select: { name: true, label: true },
            order: { name: 1 },
        });
    })));
});
//# sourceMappingURL=issue-1929.js.map