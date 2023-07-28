"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const SomeEntity_1 = require("./entity/SomeEntity");
describe("github issues > #4897 [MSSQL] Enum column definition removes and recreates constraint overwritting existing data", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        migrations: [],
        enabledDrivers: ["mssql", "sqlite"],
        schemaCreate: false,
        dropSchema: true,
        entities: [SomeEntity_1.SomeEntity],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should recognize model changes", () => Promise.all(connections.map(async (connection) => {
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.greaterThan(0);
        sqlInMemory.downQueries.length.should.be.greaterThan(0);
    })));
    it("should not generate queries when no model changes", () => Promise.all(connections.map(async (connection) => {
        await connection.driver.createSchemaBuilder().build();
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.equal(0);
        sqlInMemory.downQueries.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=issue-4897.js.map