"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #1427 precision and scale column types with errant behavior", () => {
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
    it("should correctly create column with precision and scale", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        await queryRunner.release();
        table.findColumnByName("qty").type.should.be.equal("decimal");
        table.findColumnByName("qty").precision.should.be.equal(10);
        table.findColumnByName("qty").scale.should.be.equal(6);
    })));
});
//# sourceMappingURL=issue-1427.js.map