"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const test_entity_1 = require("./entity/test.entity");
describe("github issues > #7788 MongoDB update make changes only to first matched document", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mongodb"],
            entities: [test_entity_1.TestEntity],
            schemaCreate: false,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should update all documents related to search pattern", () => Promise.all(connections.map(async (connection) => {
        const testEntityRepository = connection.getMongoRepository(test_entity_1.TestEntity);
        // save few posts
        const firstEntity = new test_entity_1.TestEntity();
        firstEntity.id = "1";
        firstEntity.name = "Test";
        await testEntityRepository.save(firstEntity);
        const secondEntity = new test_entity_1.TestEntity();
        secondEntity.id = "2";
        secondEntity.name = "Test";
        await testEntityRepository.save(secondEntity);
        const thirdEntity = new test_entity_1.TestEntity();
        thirdEntity.id = "3";
        thirdEntity.name = "Original";
        await testEntityRepository.save(thirdEntity);
        const fourthEntity = new test_entity_1.TestEntity();
        fourthEntity.id = "4";
        fourthEntity.name = "Test";
        await testEntityRepository.save(fourthEntity);
        await testEntityRepository.update({ name: "Test" }, { name: "Updated" });
        const loadedEntities = await testEntityRepository.find();
        (0, chai_1.expect)(loadedEntities[0]).to.be.instanceOf(test_entity_1.TestEntity);
        (0, chai_1.expect)(loadedEntities[0].id).to.be.eql(firstEntity.id);
        (0, chai_1.expect)(loadedEntities[0].name).to.be.equal("Updated");
        (0, chai_1.expect)(loadedEntities[1]).to.be.instanceOf(test_entity_1.TestEntity);
        (0, chai_1.expect)(loadedEntities[1].id).to.be.eql(secondEntity.id);
        (0, chai_1.expect)(loadedEntities[1].name).to.be.equal("Updated");
        (0, chai_1.expect)(loadedEntities[2]).to.be.instanceOf(test_entity_1.TestEntity);
        (0, chai_1.expect)(loadedEntities[2].id).to.be.eql(thirdEntity.id);
        (0, chai_1.expect)(loadedEntities[2].name).to.be.equal("Original");
        (0, chai_1.expect)(loadedEntities[3]).to.be.instanceOf(test_entity_1.TestEntity);
        (0, chai_1.expect)(loadedEntities[3].id).to.be.eql(fourthEntity.id);
        (0, chai_1.expect)(loadedEntities[3].name).to.be.equal("Updated");
    })));
});
//# sourceMappingURL=issue-7788.js.map