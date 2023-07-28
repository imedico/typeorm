"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #9266 queryRunner.getTable() fails if Foreign Key is set in target table", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            migrations: [__dirname + "/migrations/*{.js,.ts}"],
            enabledDrivers: ["sqlite", "better-sqlite3"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to load tables", () => Promise.all(connections.map(async (connection) => {
        await connection.runMigrations();
        const queryRunner = connection.createQueryRunner();
        const tables = await queryRunner.getTables();
        const tableNames = tables.map((table) => table.name);
        (0, chai_1.expect)(tableNames).to.include("author");
        (0, chai_1.expect)(tableNames).to.include("post");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-9266.js.map