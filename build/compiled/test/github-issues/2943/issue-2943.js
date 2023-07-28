"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Test_1 = require("./entity/Test");
describe("github issues > #2943 Inappropriate migration generated", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mariadb", "mysql"],
            entities: [Test_1.Test],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not create migrations for unsigned numeric types with no specified width", () => Promise.all(connections.map(async (connection) => {
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries).to.eql([]);
        (0, chai_1.expect)(sqlInMemory.downQueries).to.eql([]);
    })));
});
//# sourceMappingURL=issue-2943.js.map