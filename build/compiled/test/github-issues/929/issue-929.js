"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const TestEntity_1 = require("./entity/TestEntity");
describe("github issues > #929 sub-queries should set their own parameters on execution", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully and return persisted entity", () => Promise.all(connections.map(async (connection) => {
        // create objects to save
        const testEntity1 = new TestEntity_1.TestEntity();
        testEntity1.name = "Entity #1";
        await connection.manager.save(testEntity1);
        const testEntity2 = new TestEntity_1.TestEntity();
        testEntity2.name = "Entity #2";
        await connection.manager.save(testEntity2);
        const testEntity3 = new TestEntity_1.TestEntity();
        testEntity3.name = "Entity #3";
        await connection.manager.save(testEntity3);
        const testEntity4 = new TestEntity_1.TestEntity();
        testEntity4.name = "Entity #4";
        await connection.manager.save(testEntity4);
        const queryBuilder = connection.manager.createQueryBuilder(TestEntity_1.TestEntity, "testEntity");
        const subQuery = queryBuilder
            .subQuery()
            .from(TestEntity_1.TestEntity, "innerTestEntity")
            .select(["innerTestEntity.id"])
            .where("innerTestEntity.id = :innerId", { innerId: 1 });
        const results = await queryBuilder
            .select("testEntity")
            .where(`testEntity.id IN ${subQuery.getQuery()}`)
            .getMany();
        (0, chai_1.expect)(results.length).to.be.equal(1);
        (0, chai_1.expect)(results).to.eql([{ id: 1, name: "Entity #1" }]);
    })));
});
//# sourceMappingURL=issue-929.js.map