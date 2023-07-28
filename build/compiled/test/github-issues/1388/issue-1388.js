"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #1388 nullable: true dons't output 'NULL' in mysql", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create nullable column", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        table.findColumnByName("createdAt").isNullable.should.be.true;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-1388.js.map