"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const post_with_null_1_entity_1 = require("./entity/post_with_null_1.entity");
const post_with_null_2_entity_1 = require("./entity/post_with_null_2.entity");
describe("github issues > #6950 postgres: Inappropiate migration generated for `default: null`", () => {
    describe("null default", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            schemaCreate: false,
            dropSchema: true,
            entities: [post_with_null_1_entity_1.Post],
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("can recognize model changes", () => Promise.all(connections.map(async (connection) => {
            const sqlInMemory = await connection.driver
                .createSchemaBuilder()
                .log();
            sqlInMemory.upQueries.length.should.be.greaterThan(0);
            sqlInMemory.downQueries.length.should.be.greaterThan(0);
        })));
        it("does not generate when no model changes", () => Promise.all(connections.map(async (connection) => {
            await connection.driver.createSchemaBuilder().build();
            const sqlInMemory = await connection.driver
                .createSchemaBuilder()
                .log();
            sqlInMemory.upQueries.length.should.be.equal(0);
            sqlInMemory.downQueries.length.should.be.equal(0);
        })));
    });
    describe("null default and nullable", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            schemaCreate: false,
            dropSchema: true,
            entities: [post_with_null_2_entity_1.Post],
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("can recognize model changes", () => Promise.all(connections.map(async (connection) => {
            const sqlInMemory = await connection.driver
                .createSchemaBuilder()
                .log();
            sqlInMemory.upQueries.length.should.be.greaterThan(0);
            sqlInMemory.downQueries.length.should.be.greaterThan(0);
        })));
        it("does not generate when no model changes", () => Promise.all(connections.map(async (connection) => {
            await connection.driver.createSchemaBuilder().build();
            const sqlInMemory = await connection.driver
                .createSchemaBuilder()
                .log();
            sqlInMemory.upQueries.length.should.be.equal(0);
            sqlInMemory.downQueries.length.should.be.equal(0);
        })));
    });
});
//# sourceMappingURL=issue-6950.js.map