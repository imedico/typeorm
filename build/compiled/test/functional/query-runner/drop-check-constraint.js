"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("query runner > drop check constraint", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly drop check constraint and revert drop", () => Promise.all(connections.map(async (connection) => {
        // Mysql does not support check constraints.
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            return;
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table.checks.length.should.be.equal(1);
        await queryRunner.dropCheckConstraint(table, table.checks[0]);
        table = await queryRunner.getTable("post");
        table.checks.length.should.be.equal(0);
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        table.checks.length.should.be.equal(1);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=drop-check-constraint.js.map