"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const test_entity_1 = require("./entity/test.entity");
describe("github issues > #7760 Mongodb: When field is null in db, typeorm query sets it to undefined", () => {
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
    it("should delete all documents related to search pattern", () => Promise.all(connections.map(async (connection) => {
        const testEntityRepository = connection.getRepository(test_entity_1.TestEntity);
        // save few documents
        const firstEntity = new test_entity_1.TestEntity();
        firstEntity.name = "First";
        firstEntity.testId = "1";
        await testEntityRepository.save(firstEntity);
        const secondEntity = new test_entity_1.TestEntity();
        secondEntity.name = "Second";
        secondEntity.testId = null;
        await testEntityRepository.save(secondEntity);
        const thirdEntity = new test_entity_1.TestEntity();
        thirdEntity.name = "Third";
        thirdEntity.testId = "3";
        await testEntityRepository.save(thirdEntity);
        const fourthEntity = new test_entity_1.TestEntity();
        fourthEntity.name = "Fourth";
        fourthEntity.testId = null;
        await testEntityRepository.save(fourthEntity);
        const loadedEntities = await testEntityRepository.find();
        (0, chai_1.expect)(loadedEntities.length).to.be.eql(4);
        (0, chai_1.expect)(loadedEntities[0]).to.be.instanceOf(test_entity_1.TestEntity);
        (0, chai_1.expect)(loadedEntities[0].name).to.be.equal(firstEntity.name);
        (0, chai_1.expect)(loadedEntities[0].testId).to.be.eql("1");
        (0, chai_1.expect)(loadedEntities[1]).to.be.instanceOf(test_entity_1.TestEntity);
        (0, chai_1.expect)(loadedEntities[1].name).to.be.equal(secondEntity.name);
        (0, chai_1.expect)(loadedEntities[1].testId).to.be.eql(null);
        (0, chai_1.expect)(loadedEntities[2]).to.be.instanceOf(test_entity_1.TestEntity);
        (0, chai_1.expect)(loadedEntities[2].name).to.be.equal(thirdEntity.name);
        (0, chai_1.expect)(loadedEntities[2].testId).to.be.eql("3");
        (0, chai_1.expect)(loadedEntities[3]).to.be.instanceOf(test_entity_1.TestEntity);
        (0, chai_1.expect)(loadedEntities[3].name).to.be.equal(fourthEntity.name);
        (0, chai_1.expect)(loadedEntities[3].testId).to.be.eql(null);
    })));
});
//# sourceMappingURL=issue-7760.js.map