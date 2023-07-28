"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Cat_1 = require("./entity/Cat");
const Animal_1 = require("./entity/Animal");
describe("github issues > #9033 Cannot manually insert type in discriminator column of parent entity class when\
using single table inheritance when creating instance of parent entity", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("is possible to set the discriminator column manually on the base entity", () => Promise.all(dataSources.map(async (dataSource) => {
        const entityManager = dataSource.createEntityManager();
        const animalRepo = entityManager.getRepository(Animal_1.AnimalEntity);
        // Create a base class entity while manually setting discriminator.
        const maybeACat = animalRepo.create({
            name: "i-am-maybe-a-cat",
            type: "cat", // This is the discriminator for `CatEntity`.
        });
        await entityManager.save(maybeACat);
        // Load the animal / cat from the database.
        const animals = await animalRepo.find();
        (0, chai_1.expect)(animals.length).to.equal(1);
        (0, chai_1.expect)(animals[0]).to.be.instanceOf(Cat_1.CatEntity);
        (0, chai_1.expect)(animals[0].type).to.equal("cat");
    })));
});
//# sourceMappingURL=issue-9033.js.map