"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #1615 Datetime2 with any precision result in datetime2(7) in database", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mssql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create column with Datetime2 type and any precision", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("Foo");
        table
            .findColumnByName("date")
            .type.should.be.equal("datetime2");
        table.findColumnByName("date").precision.should.be.equal(0);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-1615.js.map