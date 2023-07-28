"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #3443 @JoinTable on entities without synchronization", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("Should set synchronize: false for @JoinTable when passed to options", () => Promise.all(dataSources.map(async (dataSource) => {
        const PRODUCT_TABLE_NAME = "product";
        const CATEGORY_TABLE_NAME = "category";
        const PRODUCT_CATEGORY_TABLE_NAME = "product_category";
        (0, chai_1.expect)(() => dataSource.getMetadata(PRODUCT_TABLE_NAME)).not.to.throw();
        (0, chai_1.expect)(() => dataSource.getMetadata(CATEGORY_TABLE_NAME)).not.to.throw();
        (0, chai_1.expect)(() => dataSource.getMetadata(PRODUCT_CATEGORY_TABLE_NAME)).not.to.throw();
        (0, chai_1.expect)(dataSource.getMetadata(PRODUCT_CATEGORY_TABLE_NAME)
            .synchronize).to.equal(false);
    })));
    // you can add additional tests if needed
});
//# sourceMappingURL=issue-3443.js.map