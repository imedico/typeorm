"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #9601 view+schema+synchronize broken for oracle", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: false,
        dropSchema: true,
        enabledDrivers: ["oracle"],
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
//# sourceMappingURL=issue-9601.js.map