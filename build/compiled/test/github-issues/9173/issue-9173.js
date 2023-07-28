"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const View_1 = require("../../../src/schema-builder/view/View");
const chai_1 = require("chai");
describe("github issues > #9173 missing typeorm_metadata", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: [
            "sqlite",
            "mysql",
            "postgres",
            "better-sqlite3",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create a view without view entity", async () => {
        for (const connection of connections) {
            await connection.runMigrations({
                transaction: "all",
            });
            await connection.createQueryRunner().createTable(new src_1.Table({
                name: "test_table",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isGenerated: true,
                        isPrimary: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "name",
                        type: "text",
                    },
                ],
            }));
            // create a test view
            await connection.createQueryRunner().createView(new View_1.View({
                name: "test_view",
                expression: "SELECT * FROM test_table",
            }));
            const view = await connection.query("SELECT * FROM test_view");
            (0, chai_1.expect)(view).to.be.exist;
        }
    });
});
//# sourceMappingURL=issue-9173.js.map