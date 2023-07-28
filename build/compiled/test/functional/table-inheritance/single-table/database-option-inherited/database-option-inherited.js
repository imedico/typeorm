"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
describe("table-inheritance > single-table > database-option-inherited", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        // creating more databases isn't always possible(e.g oracle official docker images)
        enabledDrivers: [
            "postgres",
            "cockroachdb",
            "mariadb",
            "mssql",
            "mysql",
            "sqlite",
            "better-sqlite3",
            "sqljs",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly inherit database option", () => Promise.all(connections.map(async (connection) => {
        connection.entityMetadatas.forEach((metadata) => metadata.database.should.equal("test"));
    })));
});
//# sourceMappingURL=database-option-inherited.js.map