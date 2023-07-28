"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Test_1 = require("./entity/Test");
describe("github issues > #7698 MariaDB STORED columns don't accept [NULL | NOT NULL]", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mariadb"],
            entities: [Test_1.Test],
            schemaCreate: false,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not generate queries with NULL or NOT NULL for stored columns in mariadb", () => Promise.all(connections.map(async (connection) => {
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.greaterThan(0);
    })));
});
//# sourceMappingURL=issue-7698.js.map