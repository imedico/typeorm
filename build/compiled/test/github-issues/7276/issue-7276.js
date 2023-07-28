"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const TestPostgres_1 = require("./entity/TestPostgres");
const TestMssql_1 = require("./entity/TestMssql");
describe("github issues > #7276 Schema sync not able to find diff correctly and executes same queries on every run", () => {
    describe("postgres", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["postgres"],
            schemaCreate: false,
            dropSchema: true,
            entities: [TestPostgres_1.ClusterCluster],
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
    describe("mssql", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mssql"],
            schemaCreate: false,
            dropSchema: true,
            entities: [TestMssql_1.ClusterCluster],
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
});
//# sourceMappingURL=issue-7276.js.map