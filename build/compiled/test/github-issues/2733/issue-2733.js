"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #2733 should correctly handle function calls with upercase letters as default values", () => {
    let connections;
    it("MSSQL, Sqljs, Sqlite", async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/MSSQLDummy{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["mssql", "sqljs", "sqlite", "better-sqlite3"],
        });
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        await Promise.all(connections.map(async (connection) => {
            const schemaBuilder = connection.driver.createSchemaBuilder();
            const syncQueries = await schemaBuilder.log();
            (0, chai_1.expect)(syncQueries.downQueries).to.be.eql([]);
            (0, chai_1.expect)(syncQueries.upQueries).to.be.eql([]);
        }));
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
    it("Postgres", async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/PostgresDummy{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["postgres"],
        });
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        await Promise.all(connections.map(async (connection) => {
            const schemaBuilder = connection.driver.createSchemaBuilder();
            const syncQueries = await schemaBuilder.log();
            (0, chai_1.expect)(syncQueries.downQueries).to.be.eql([]);
            (0, chai_1.expect)(syncQueries.upQueries).to.be.eql([]);
        }));
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
});
//# sourceMappingURL=issue-2733.js.map