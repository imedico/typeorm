"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Site_1 = require("./entity/Site");
describe("github issues > #7974 Adding relations option to findTrees()", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Category_1.Category, Site_1.Site],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(async () => {
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        for (let connection of connections) {
            let categoryRepo = connection.getRepository(Category_1.Category);
            let siteRepo = connection.getRepository(Site_1.Site);
            let c1 = new Category_1.Category();
            c1.title = "Category 1";
            c1.parentCategory = null;
            c1.childCategories = [];
            c1.sites = [];
            let c2 = new Category_1.Category();
            c2.title = "Category 2";
            c2.parentCategory = null;
            c2.childCategories = [];
            c2.sites = [];
            let c3 = new Category_1.Category();
            c3.title = "Category 1.1";
            c3.parentCategory = c1;
            c3.childCategories = [];
            c3.sites = [];
            let c4 = new Category_1.Category();
            c4.title = "Category 1.1.1";
            c4.parentCategory = c3;
            c4.childCategories = [];
            c4.sites = [];
            c1.childCategories = [c3];
            c3.childCategories = [c4];
            let s1 = new Site_1.Site();
            s1.title = "Site of Category 1";
            s1.parentCategory = c1;
            let s2 = new Site_1.Site();
            s2.title = "Site of Category 1";
            s2.parentCategory = c1;
            let s3 = new Site_1.Site();
            s3.title = "Site of Category 1.1";
            s3.parentCategory = c3;
            let s4 = new Site_1.Site();
            s4.title = "Site of Category 1.1";
            s4.parentCategory = c3;
            let s5 = new Site_1.Site();
            s5.title = "Site of Category 1.1.1";
            s5.parentCategory = c4;
            // Create the categories
            await categoryRepo.save(c1);
            await categoryRepo.save(c2);
            await categoryRepo.save(c3);
            await categoryRepo.save(c4);
            // Create the sites
            await siteRepo.save(s1);
            await siteRepo.save(s2);
            await siteRepo.save(s3);
            await siteRepo.save(s4);
            await siteRepo.save(s5);
            // Set the just created relations correctly
            c1.sites = [s1, s2];
            c2.sites = [];
            c3.sites = [s3, s4];
            c4.sites = [s5];
        }
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return tree without sites relations", async () => await Promise.all(connections.map(async (connection) => {
        let result = await connection
            .getTreeRepository(Category_1.Category)
            .findTrees();
        // The complete tree should exist but other relations than the parent- / child-relations should not be loaded
        (0, chai_1.expect)(result).to.have.lengthOf(2);
        (0, chai_1.expect)(result[0].sites).equals(undefined);
        (0, chai_1.expect)(result[0].childCategories).to.have.lengthOf(1);
        (0, chai_1.expect)(result[0].childCategories[0].childCategories).to.have.lengthOf(1);
        (0, chai_1.expect)(result[0].childCategories[0].childCategories[0].sites).equal(undefined);
    })));
    it("should return tree with sites relations", async () => await Promise.all(connections.map(async (connection) => {
        let result = await connection
            .getTreeRepository(Category_1.Category)
            .findTrees({ relations: ["sites"] });
        // The complete tree should exist and site relations should not be loaded for every category
        (0, chai_1.expect)(result).to.have.lengthOf(2);
        (0, chai_1.expect)(result[0].sites).lengthOf(2);
        (0, chai_1.expect)(result[1].sites).to.be.an("array");
        (0, chai_1.expect)(result[1].sites).to.have.lengthOf(0);
        (0, chai_1.expect)(result[0].childCategories[0].sites).to.have.lengthOf(2);
        (0, chai_1.expect)(result[0].childCategories[0].childCategories[0].sites).to.have.lengthOf(1);
        (0, chai_1.expect)(result[0].childCategories[0].childCategories[0].sites).to.be.an("array");
        (0, chai_1.expect)(result[0].childCategories[0].childCategories[0].sites[0]
            .title).to.be.equal("Site of Category 1.1.1");
    })));
});
//# sourceMappingURL=issue-7974.js.map