"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../../test/utils/test-utils");
describe("github issues > #6947 Custom primary column for TreeRepository based entities unable to get tree descendants", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Category_1.Category],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("entities with custom primary column names should work", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const parent = new Category_1.Category();
        parent.cat_name = "parent";
        await categoryRepository.save(parent);
        const child = new Category_1.Category();
        child.cat_name = "child";
        child.parent = parent;
        await categoryRepository.save(child);
        const tree = await categoryRepository.findDescendantsTree((await categoryRepository.findOneBy({
            cat_name: "parent",
        })));
        tree.should.deep.include({
            cat_id: 1,
            cat_name: "parent",
            children: [
                {
                    cat_id: 2,
                    cat_name: "child",
                    children: [],
                },
            ],
        });
    })));
});
//# sourceMappingURL=issue-6947.js.map