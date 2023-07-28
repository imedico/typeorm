"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const TaskNotification_1 = require("./entity/TaskNotification");
describe("github issues > #7647 Duplicate migrations when using 'enumName' ColumnOption in an 'enum' type Postgres", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        schemaCreate: false,
        dropSchema: true,
        entities: [TaskNotification_1.TaskNotification],
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
//# sourceMappingURL=issue-7647.js.map