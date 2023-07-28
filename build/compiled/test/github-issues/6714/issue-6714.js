"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const session_1 = require("./entity/session");
const sessionchanged_1 = require("./entity/sessionchanged");
describe("github issues > #6714 Migration:generate issue with onUpdate using mariadb 10.4", () => {
    it("dont change anything", async () => {
        let connections;
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [session_1.Session],
            schemaCreate: false,
            dropSchema: true,
            enabledDrivers: ["mariadb"],
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
    it("recognizing on update changes", async () => {
        // this connection create database with a Session entity
        const baseConnections = await (0, test_utils_1.createTestingConnections)({
            entities: [session_1.Session],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["mariadb"],
        });
        // this connection change Session entity on update value
        const connections = await (0, test_utils_1.createTestingConnections)({
            entities: [sessionchanged_1.Session],
            schemaCreate: false,
            dropSchema: false,
            enabledDrivers: ["mariadb"],
            name: "test",
        });
        await Promise.all(connections.map(async (connection) => {
            const schemaBuilder = connection.driver.createSchemaBuilder();
            const syncQueries = await schemaBuilder.log();
            (0, chai_1.expect)(syncQueries.downQueries.length).not.to.be.eql(0);
            (0, chai_1.expect)(syncQueries.upQueries.length).not.to.be.eql(0);
        }));
        await (0, test_utils_1.closeTestingConnections)(baseConnections);
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
});
//# sourceMappingURL=issue-6714.js.map