"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const TableExclusion_1 = require("../../../src/schema-builder/table/TableExclusion");
describe("query runner > create exclusion constraint", () => {
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
    it("should correctly create exclusion constraint and revert creation", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.createTable(new src_1.Table({
            name: "question",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "version",
                    type: "int",
                },
            ],
        }), true);
        // clear sqls in memory to avoid removing tables when down queries executed.
        queryRunner.clearSqlMemory();
        const driver = connection.driver;
        const exclusion1 = new TableExclusion_1.TableExclusion({
            expression: `USING gist (${driver.escape("name")} WITH =)`,
        });
        const exclusion2 = new TableExclusion_1.TableExclusion({
            expression: `USING gist (${driver.escape("id")} WITH =)`,
        });
        await queryRunner.createExclusionConstraints("question", [
            exclusion1,
            exclusion2,
        ]);
        let table = await queryRunner.getTable("question");
        table.exclusions.length.should.be.equal(2);
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("question");
        table.exclusions.length.should.be.equal(0);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-exclusion-constraint.js.map