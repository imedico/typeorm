"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("query runner > create and drop schema", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mssql", "postgres", "sap"],
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create and drop schema and revert it", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.createSchema("myTestSchema", true);
        let hasSchema = await queryRunner.hasSchema("myTestSchema");
        hasSchema.should.be.true;
        await queryRunner.dropSchema("myTestSchema");
        hasSchema = await queryRunner.hasSchema("myTestSchema");
        hasSchema.should.be.false;
        await queryRunner.executeMemoryDownSql();
        hasSchema = await queryRunner.hasSchema("myTestSchema");
        hasSchema.should.be.false;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-and-drop-schema.js.map