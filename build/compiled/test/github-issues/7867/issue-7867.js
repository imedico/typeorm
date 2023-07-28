"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Example_1 = require("./entity/Example");
const chai_1 = require("chai");
describe("github issues > #7867 Column not renamed when schema/database is set", () => {
    describe("schema is set", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [Example_1.Example],
                schemaCreate: true,
                dropSchema: true,
                driverSpecific: {
                    schema: "public",
                },
                enabledDrivers: ["postgres"],
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly change column name", () => Promise.all(connections.map(async (connection) => {
            const postMetadata = connection.getMetadata(Example_1.Example);
            const nameColumn = postMetadata.findColumnWithPropertyName("name");
            nameColumn.propertyName = "title";
            nameColumn.build(connection);
            await connection.synchronize();
            const queryRunner = connection.createQueryRunner();
            const postTable = await queryRunner.getTable("example");
            await queryRunner.release();
            (0, chai_1.expect)(postTable.findColumnByName("name")).to.be.undefined;
            postTable.findColumnByName("title").should.be.exist;
            // revert changes
            nameColumn.propertyName = "name";
            nameColumn.build(connection);
        })));
    });
    describe("database is set", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [Example_1.Example],
                schemaCreate: true,
                dropSchema: true,
                driverSpecific: {
                    database: "test",
                },
                enabledDrivers: ["mysql"],
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly change column name", () => Promise.all(connections.map(async (connection) => {
            const postMetadata = connection.getMetadata(Example_1.Example);
            const nameColumn = postMetadata.findColumnWithPropertyName("name");
            nameColumn.propertyName = "title";
            nameColumn.build(connection);
            await connection.synchronize();
            const queryRunner = connection.createQueryRunner();
            const postTable = await queryRunner.getTable("example");
            await queryRunner.release();
            (0, chai_1.expect)(postTable.findColumnByName("name")).to.be.undefined;
            postTable.findColumnByName("title").should.be.exist;
            // revert changes
            nameColumn.propertyName = "name";
            nameColumn.build(connection);
        })));
    });
});
//# sourceMappingURL=issue-7867.js.map