"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #1652 Multiple primary key defined", () => {
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
    it("should correctly create table when multiple primary keys defined and one of them is generated", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        table.findColumnByName("id").isPrimary.should.be.true;
        table.findColumnByName("id").isGenerated.should.be.true;
        table
            .findColumnByName("id")
            .generationStrategy.should.be.equal("increment");
        table.findColumnByName("name").isPrimary.should.be.true;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-1652.js.map