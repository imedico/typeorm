"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Slug_1 = require("./entity/Slug");
const chai_1 = require("chai");
describe("github issues > #7415 Tree entities with embedded primary columns are not built correctly", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should build tree entities with embedded primary columns correctly", () => Promise.all(connections.map(async (connection) => {
        const manager = connection.manager;
        const a1 = new Category_1.Category("1");
        await manager.save(a1);
        const a2 = new Category_1.Category("2");
        await manager.save(a2);
        const a11 = new Category_1.Category("1.1", a1);
        await manager.save(a11);
        const a12 = new Category_1.Category("1.2", a1);
        await manager.save(a12);
        const a13 = new Category_1.Category("1.3", a1);
        await manager.save(a13);
        const a121 = new Category_1.Category("1.2.1", a12);
        await manager.save(a121);
        const a122 = new Category_1.Category("1.2.2", a12);
        await manager.save(a122);
        const repository = manager.getTreeRepository(Category_1.Category);
        const descendantsTree = await repository.findDescendantsTree(a1);
        const expectedDescendantsTree = {
            id: new Slug_1.Slug("1"),
            children: [
                { id: new Slug_1.Slug("1.1"), children: [] },
                {
                    id: new Slug_1.Slug("1.2"),
                    children: [
                        { id: new Slug_1.Slug("1.2.1"), children: [] },
                        { id: new Slug_1.Slug("1.2.2"), children: [] },
                    ],
                },
                { id: new Slug_1.Slug("1.3"), children: [] },
            ],
        };
        (0, chai_1.expect)(descendantsTree.id).to.be.eql(expectedDescendantsTree.id);
        (0, chai_1.expect)(descendantsTree.children).to.have.deep.members(expectedDescendantsTree.children);
        const ancestorsTree = await repository.findAncestorsTree(a121);
        const expectedAncestorsTree = {
            id: new Slug_1.Slug("1.2.1"),
            parent: {
                id: new Slug_1.Slug("1.2"),
                parent: { id: new Slug_1.Slug("1") },
            },
        };
        (0, chai_1.expect)(ancestorsTree).to.be.eql(expectedAncestorsTree);
    })));
});
//# sourceMappingURL=issue-7415.js.map