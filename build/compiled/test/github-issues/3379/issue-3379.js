"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("github issues > #3379 Migration will keep create and drop indexes if index name is the same across tables", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not recreate indices", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let postTableName = "post";
        if (connection.driver.options.type === "mssql") {
            postTableName = "testDB.testSchema.post";
            await queryRunner.createDatabase("testDB", true);
            await queryRunner.createSchema("testDB.testSchema", true);
        }
        else if (connection.driver.options.type === "postgres") {
            postTableName = "testSchema.post";
            await queryRunner.createSchema("testSchema", true);
        }
        else if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver)) {
            postTableName = "testDB.post";
            await queryRunner.createDatabase("testDB", true);
        }
        await queryRunner.createTable(new src_1.Table({
            name: postTableName,
            columns: [
                {
                    name: "id",
                    type: DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver)
                        ? "integer"
                        : "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ],
            indices: [
                { name: "name_index", columnNames: ["name"] },
            ],
        }), true);
        // Only MySQL and SQLServer allows non unique index names
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "mssql") {
            await queryRunner.createTable(new src_1.Table({
                name: "category",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                ],
                indices: [
                    { name: "name_index", columnNames: ["name"] },
                ],
            }), true);
        }
        await queryRunner.release();
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=issue-3379.js.map