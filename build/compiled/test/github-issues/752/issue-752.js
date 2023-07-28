"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Product_1 = require("./entity/Product");
describe("github issues > #752 postgres - count query fails for empty table", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return user by a given email and proper escape 'user' keyword", () => Promise.all(connections.map(async (connection) => {
        const product = new Product_1.Product();
        product.name = "Apple";
        product.productVersionId = 1;
        await connection.manager.save(product);
        const count = await connection
            .getRepository(Product_1.Product)
            .countBy({ productVersionId: 1 });
        count.should.be.equal(1);
    })));
});
//# sourceMappingURL=issue-752.js.map