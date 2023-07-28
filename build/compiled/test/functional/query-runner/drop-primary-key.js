"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("query runner > drop primary key", () => {
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
    it("should correctly drop primary key and revert drop", () => Promise.all(connections.map(async (connection) => {
        // CockroachDB does not allow dropping primary key
        if (connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "spanner")
            return;
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table.findColumnByName("id").isPrimary.should.be.true;
        await queryRunner.dropPrimaryKey(table);
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").isPrimary.should.be.false;
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").isPrimary.should.be.true;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=drop-primary-key.js.map