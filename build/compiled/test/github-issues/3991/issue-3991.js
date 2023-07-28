"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/cockroachdb/Post");
const Post_2 = require("./entity/mssql/Post");
const Post_3 = require("./entity/mysql/Post");
const Post_4 = require("./entity/postgres/Post");
const Post_5 = require("./entity/oracle/Post");
const Post_6 = require("./entity/sqlite/Post");
describe("github issues > #3991 Migration keeps changing @CreateDateColumn/@UpdateDateColumn timestamp column to same definition", () => {
    describe("postgres", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["postgres"],
            schemaCreate: false,
            dropSchema: true,
            entities: [Post_4.Post],
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
    describe("cockroachdb", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["cockroachdb"],
            schemaCreate: false,
            dropSchema: true,
            entities: [Post_1.Post],
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
    describe("oracle", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["oracle"],
            schemaCreate: false,
            dropSchema: true,
            entities: [Post_5.Post],
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
    describe("sqlite", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["sqlite"],
            schemaCreate: false,
            dropSchema: true,
            entities: [Post_6.Post],
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
    describe("mysql, mariadb", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mysql", "mariadb"],
            schemaCreate: false,
            dropSchema: true,
            entities: [Post_3.Post],
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
            entities: [Post_2.Post],
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
//# sourceMappingURL=issue-3991.js.map