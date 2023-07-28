"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Product_1 = require("./entity/Product");
describe("github issues > #1981 Boolean values not casted properly when used in .find() condition", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "better-sqlite3"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to find by boolean find", () => Promise.all(connections.map(async (connection) => {
        const product = new Product_1.Product();
        product.liked = true;
        await connection.manager.save(product);
        const loadedProduct = await connection.manager.findOneBy(Product_1.Product, { liked: true });
        loadedProduct.liked.should.be.equal(true);
    })));
});
//# sourceMappingURL=issue-1981.js.map