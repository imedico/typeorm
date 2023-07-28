"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const UserEntity_1 = require("./entity/UserEntity");
describe("github issues > #7217 Modifying enum fails migration if the enum is used in an array column", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        migrations: [],
        enabledDrivers: ["postgres"],
        schemaCreate: false,
        dropSchema: true,
        entities: [UserEntity_1.User],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not generate queries when no model changes", () => Promise.all(connections.map(async (connection) => {
        await connection.driver.createSchemaBuilder().build();
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.equal(0);
        sqlInMemory.downQueries.length.should.be.equal(0);
    })));
    it("should correctly change enum", () => Promise.all(connections.map(async (connection) => {
        const metadata = connection.getMetadata(UserEntity_1.User);
        const columnMetadata = metadata.columns.find((column) => column.databaseName === "roles");
        columnMetadata.enum = ["PLAYER", "FULL_GAME"];
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.greaterThan(0);
        sqlInMemory.downQueries.length.should.be.greaterThan(0);
    })));
});
//# sourceMappingURL=issue-7217.js.map