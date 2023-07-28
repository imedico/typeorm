"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #7068", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Category_1.Category],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("categories should be attached via parent and saved properly", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const a1 = new Category_1.Category();
        a1.name = "a1";
        await categoryRepository.save(a1);
        const a11 = new Category_1.Category();
        a11.name = "a11";
        a11.parentCategory = a1;
        await categoryRepository.save(a11);
        const a12 = new Category_1.Category();
        a12.name = "a12";
        a12.parentCategory = a1;
        await categoryRepository.save(a12);
        const rootCategories = await categoryRepository.findRoots();
        rootCategories.should.be.eql([
            {
                id: 1,
                name: "a1",
            },
        ]);
        const a11Parent = await categoryRepository.findAncestors(a11);
        a11Parent.length.should.be.equal(2);
        a11Parent.should.deep.include({ id: 1, name: "a1" });
        a11Parent.should.deep.include({ id: 2, name: "a11" });
        const a1Children = await categoryRepository.findDescendants(a1);
        a1Children.length.should.be.equal(3);
        a1Children.should.deep.include({ id: 1, name: "a1" });
        a1Children.should.deep.include({ id: 2, name: "a11" });
        a1Children.should.deep.include({ id: 3, name: "a12" });
    })));
    it("categories should be attached via children and saved properly", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const a1 = new Category_1.Category();
        a1.name = "a1";
        await categoryRepository.save(a1);
        const a11 = new Category_1.Category();
        a11.name = "a11";
        const a12 = new Category_1.Category();
        a12.name = "a12";
        a1.childCategories = [a11, a12];
        await categoryRepository.save(a1);
        const rootCategories = await categoryRepository.findRoots();
        rootCategories.should.be.eql([
            {
                id: 1,
                name: "a1",
            },
        ]);
        const a11Parent = await categoryRepository.findAncestors(a11);
        a11Parent.length.should.be.equal(2);
        a11Parent.should.deep.include({ id: 1, name: "a1" });
        a11Parent.should.deep.include({ id: 2, name: "a11" });
        const a1Children = await categoryRepository.findDescendants(a1);
        a1Children.length.should.be.equal(3);
        a1Children.should.deep.include({ id: 1, name: "a1" });
        a1Children.should.deep.include({ id: 2, name: "a11" });
        a1Children.should.deep.include({ id: 3, name: "a12" });
    })));
    it("categories should be attached via children and saved properly and everything must be saved in cascades", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const a1 = new Category_1.Category();
        a1.name = "a1";
        const a11 = new Category_1.Category();
        a11.name = "a11";
        const a12 = new Category_1.Category();
        a12.name = "a12";
        const a111 = new Category_1.Category();
        a111.name = "a111";
        const a112 = new Category_1.Category();
        a112.name = "a112";
        a1.childCategories = [a11, a12];
        a11.childCategories = [a111, a112];
        await categoryRepository.save(a1);
        const rootCategories = await categoryRepository.findRoots();
        rootCategories.should.be.eql([
            {
                id: 1,
                name: "a1",
            },
        ]);
        const a11Parent = await categoryRepository.findAncestors(a11);
        a11Parent.length.should.be.equal(2);
        a11Parent.should.deep.include({ id: 1, name: "a1" });
        a11Parent.should.deep.include({ id: 2, name: "a11" });
        const a1Children = await categoryRepository.findDescendants(a1);
        const a1ChildrenNames = a1Children.map((child) => child.name);
        a1ChildrenNames.length.should.be.equal(5);
        a1ChildrenNames.should.deep.include("a1");
        a1ChildrenNames.should.deep.include("a11");
        a1ChildrenNames.should.deep.include("a12");
        a1ChildrenNames.should.deep.include("a111");
        a1ChildrenNames.should.deep.include("a112");
    })));
    // todo: finish implementation and implement on other trees
    it.skip("categories should remove removed children", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const a1 = new Category_1.Category();
        a1.name = "a1";
        const a11 = new Category_1.Category();
        a11.name = "a11";
        const a12 = new Category_1.Category();
        a12.name = "a12";
        a1.childCategories = [a11, a12];
        await categoryRepository.save(a1);
        const a1Children1 = await categoryRepository.findDescendants(a1);
        const a1ChildrenNames1 = a1Children1.map((child) => child.name);
        a1ChildrenNames1.length.should.be.equal(3);
        a1ChildrenNames1.should.deep.include("a1");
        a1ChildrenNames1.should.deep.include("a11");
        a1ChildrenNames1.should.deep.include("a12");
        // a1.childCategories = [a11];
        // await categoryRepository.save(a1);
        //
        // const a1Children2 = await categoryRepository.findDescendants(a1);
        // const a1ChildrenNames2 = a1Children2.map(child => child.name);
        // a1ChildrenNames2.length.should.be.equal(3);
        // a1ChildrenNames2.should.deep.include("a1");
        // a1ChildrenNames2.should.deep.include("a11");
        // a1ChildrenNames2.should.deep.include("a12");
    })));
    // todo: finish implementation and implement on other trees
    it.skip("sub-category should be removed with all its children", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = connection.getTreeRepository(Category_1.Category);
        const a1 = new Category_1.Category();
        a1.name = "a1";
        const a11 = new Category_1.Category();
        a11.name = "a11";
        const a12 = new Category_1.Category();
        a12.name = "a12";
        a1.childCategories = [a11, a12];
        await categoryRepository.save(a1);
        const a1Children1 = await categoryRepository.findDescendants(a1);
        const a1ChildrenNames1 = a1Children1.map((child) => child.name);
        a1ChildrenNames1.length.should.be.equal(3);
        a1ChildrenNames1.should.deep.include("a1");
        a1ChildrenNames1.should.deep.include("a11");
        a1ChildrenNames1.should.deep.include("a12");
        await categoryRepository.remove(a1);
        // a1.childCategories = [a11];
        // await categoryRepository.save(a1);
        //
        // const a1Children2 = await categoryRepository.findDescendants(a1);
        // const a1ChildrenNames2 = a1Children2.map(child => child.name);
        // a1ChildrenNames2.length.should.be.equal(3);
        // a1ChildrenNames2.should.deep.include("a1");
        // a1ChildrenNames2.should.deep.include("a11");
        // a1ChildrenNames2.should.deep.include("a12");
    })));
});
//# sourceMappingURL=issue-7068.js.map