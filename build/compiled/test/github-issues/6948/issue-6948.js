"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../../test/utils/test-utils");
describe("github issues > #6948 TreeRepository's findRoots query incorrectly when using a custom primary key", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Category_1.Category],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("entity parent column should work with custom primary column names ", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        await categoryRepository.save(categoryRepository.create({
            cat_name: "Root node",
        }));
        const rootNodes = await categoryRepository.findRoots();
        rootNodes[0].should.deep.include({
            cat_name: "Root node",
        });
    })));
});
//# sourceMappingURL=issue-6948.js.map