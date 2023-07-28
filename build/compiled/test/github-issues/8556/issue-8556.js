"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const category_entity_1 = require("./entity/category.entity");
describe("github issues > #8556 TreeRepository.findDescendants/Tree should return empty if tree parent entity does not exist", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        dropSchema: true,
        schemaCreate: true,
        name: (0, test_utils_1.generateRandomText)(10), // Use a different name to avoid a random failure in build pipeline
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load descendants when findDescendants is called for a tree entity", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getTreeRepository(category_entity_1.Category);
        const root = await repo.save({
            id: 1,
            name: "root",
        });
        await repo.save({
            id: 2,
            name: "child",
            parent: root,
        });
        const descendantsIncludingParent = await repo.findDescendants(root);
        (0, chai_1.expect)(descendantsIncludingParent.length).to.be.equal(2);
        const descendantTree = await repo.findDescendantsTree(root);
        (0, chai_1.expect)(descendantTree.children.length).to.be.equal(1);
        const countDescendantsIncludingParent = await repo.countDescendants(root);
        (0, chai_1.expect)(countDescendantsIncludingParent).to.be.equal(2);
    })));
    it("should return empty when findDescendants is called for a non existing tree entity", () => Promise.all(connections.map(async (connection) => {
        const repo = connection.getTreeRepository(category_entity_1.Category);
        const root = await repo.save({
            id: 1,
            name: "root",
        });
        await repo.save({
            id: 2,
            name: "child",
            parent: root,
        });
        const descendantsOfNonExistingParent = await repo.findDescendants({ id: -1 });
        (0, chai_1.expect)(descendantsOfNonExistingParent.length).to.be.equal(0);
        const descendantTree = await repo.findDescendantsTree({
            id: -1,
        });
        (0, chai_1.expect)(descendantTree.children.length).to.be.equal(0);
        const countDescendantsIncludingParent = await repo.countDescendants({ id: -1 });
        (0, chai_1.expect)(countDescendantsIncludingParent).to.be.equal(0);
    })));
});
//# sourceMappingURL=issue-8556.js.map