"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Category_1 = require("./entity/Category");
describe("github issues > #904 Using closure tables without @TreeLevelColumn will always fail on insert", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work correctly when saving using parent category", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const a1 = new Category_1.Category();
        a1.name = "a1";
        const b1 = new Category_1.Category();
        b1.name = "b1";
        const c1 = new Category_1.Category();
        c1.name = "c1";
        const c11 = new Category_1.Category();
        c11.name = "c11";
        const c12 = new Category_1.Category();
        c12.name = "c12";
        c11.parentCategory = c1;
        c12.parentCategory = c1;
        await categoryRepository.save(a1);
        await categoryRepository.save(b1);
        await categoryRepository.save(c1);
        await categoryRepository.save(c11);
        await categoryRepository.save(c12);
        const roots = await categoryRepository.findRoots();
        roots.should.be.eql([
            {
                id: 1,
                name: "a1",
            },
            {
                id: 2,
                name: "b1",
            },
            {
                id: 3,
                name: "c1",
            },
        ]);
        const c1Tree = await categoryRepository.findDescendantsTree(c1);
        c1Tree.should.be.equal(c1);
        c1Tree.should.be.eql({
            id: 3,
            name: "c1",
            childCategories: [
                {
                    id: 4,
                    name: "c11",
                    childCategories: [],
                },
                {
                    id: 5,
                    name: "c12",
                    childCategories: [],
                },
            ],
        });
    })));
    it("should work correctly when saving using children categories", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const a1 = new Category_1.Category();
        a1.name = "a1";
        const b1 = new Category_1.Category();
        b1.name = "b1";
        const c1 = new Category_1.Category();
        c1.name = "c1";
        const c11 = new Category_1.Category();
        c11.name = "c11";
        const c12 = new Category_1.Category();
        c12.name = "c12";
        c1.childCategories = [c11];
        await categoryRepository.save(a1);
        await categoryRepository.save(b1);
        await categoryRepository.save(c1);
        c1.childCategories.push(c12);
        await categoryRepository.save(c1);
        // await categoryRepository.save(c11);
        // await categoryRepository.save(c12);
        const roots = await categoryRepository.findRoots();
        roots.should.be.eql([
            {
                id: 1,
                name: "a1",
            },
            {
                id: 2,
                name: "b1",
            },
            {
                id: 3,
                name: "c1",
            },
        ]);
        const c1Tree = await categoryRepository.findDescendantsTree(c1);
        c1Tree.should.be.equal(c1);
        c1Tree.should.be.eql({
            id: 3,
            name: "c1",
            childCategories: [
                {
                    id: 4,
                    name: "c11",
                    childCategories: [],
                },
                {
                    id: 5,
                    name: "c12",
                    childCategories: [],
                },
            ],
        });
    })));
    it("should be able to retrieve the whole tree", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const a1 = new Category_1.Category();
        a1.name = "a1";
        const b1 = new Category_1.Category();
        b1.name = "b1";
        const c1 = new Category_1.Category();
        c1.name = "c1";
        const c11 = new Category_1.Category();
        c11.name = "c11";
        const c12 = new Category_1.Category();
        c12.name = "c12";
        c1.childCategories = [c11];
        await categoryRepository.save(a1);
        await categoryRepository.save(b1);
        await categoryRepository.save(c1);
        c1.childCategories.push(c12);
        await categoryRepository.save(c1);
        const tree = await categoryRepository.findTrees();
        tree.should.be.eql([
            {
                id: 1,
                name: "a1",
                childCategories: [],
            },
            {
                id: 2,
                name: "b1",
                childCategories: [],
            },
            {
                id: 3,
                name: "c1",
                childCategories: [
                    {
                        id: 4,
                        name: "c11",
                        childCategories: [],
                    },
                    {
                        id: 5,
                        name: "c12",
                        childCategories: [],
                    },
                ],
            },
        ]);
    })));
});
//# sourceMappingURL=issue-904.js.map