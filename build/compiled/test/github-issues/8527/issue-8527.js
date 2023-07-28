"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const TestEntity_1 = require("./entity/TestEntity");
describe("github issues > #8527 cannot clear database inside a transaction.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [TestEntity_1.TestEntity],
        enabledDrivers: ["postgres", "sqlite", "mysql"],
        dropSchema: true,
        schemaCreate: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not fail when clearing a database inside a transaction", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.startTransaction();
        await (0, chai_1.expect)(queryRunner.clearDatabase()).not.to.be.rejected;
        await queryRunner.commitTransaction();
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-8527.js.map