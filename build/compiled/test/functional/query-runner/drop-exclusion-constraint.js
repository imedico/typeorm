"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("query runner > drop exclusion constraint", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly drop exclusion constraint and revert drop", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table.exclusions.length.should.be.equal(1);
        await queryRunner.dropExclusionConstraint(table, table.exclusions[0]);
        table = await queryRunner.getTable("post");
        table.exclusions.length.should.be.equal(0);
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        table.exclusions.length.should.be.equal(1);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=drop-exclusion-constraint.js.map