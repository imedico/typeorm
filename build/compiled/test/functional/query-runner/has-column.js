"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("query runner > has column", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly check if column exist", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let hasIdColumn = await queryRunner.hasColumn("post", "id");
        let hasNameColumn = await queryRunner.hasColumn("post", "name");
        let hasVersionColumn = await queryRunner.hasColumn("post", "version");
        let hasDescriptionColumn = await queryRunner.hasColumn("post", "description");
        hasIdColumn.should.be.true;
        hasNameColumn.should.be.true;
        hasVersionColumn.should.be.true;
        hasDescriptionColumn.should.be.false;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=has-column.js.map