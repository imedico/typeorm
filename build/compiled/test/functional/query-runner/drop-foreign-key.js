"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("query runner > drop foreign key", () => {
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
    it("should correctly drop foreign key and revert drop", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("student");
        table.foreignKeys.length.should.be.equal(2);
        await queryRunner.dropForeignKey(table, table.foreignKeys[0]);
        table = await queryRunner.getTable("student");
        table.foreignKeys.length.should.be.equal(1);
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("student");
        table.foreignKeys.length.should.be.equal(2);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=drop-foreign-key.js.map