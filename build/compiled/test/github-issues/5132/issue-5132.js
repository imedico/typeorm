"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const foo_entity_1 = require("./entity/foo.entity");
describe("github issues > #5132: Default of -1 (minus 1) generates useless migrations`", () => {
    describe("-1 (minus 1) in default value", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            schemaCreate: false,
            dropSchema: true,
            entities: [foo_entity_1.Foo],
            enabledDrivers: ["postgres", "cockroachdb"],
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
//# sourceMappingURL=issue-5132.js.map