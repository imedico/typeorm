"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Entity_1 = require("./entity/Entity");
describe("github issues > #3828 Conflicting PR to fix postgres schema:log with uppercase table names and enums", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Entity_1.MyEntity],
            enabledDrivers: ["postgres"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("schema sync should work when enum type name was changed", () => Promise.all(connections.map(async (connection) => {
        // Rename type to what typeorm 0.2.14 created
        // @see https://github.com/typeorm/typeorm/commit/0338d5eedcaedfd9571a90ebe1975b9b07c8e07a
        await connection.query(`ALTER TYPE "MyEntity_mycolumn_enum" RENAME TO "myentity_mycolumn_enum"`);
        // Sync database, so that typeorm create the table and enum type
        await connection.synchronize();
    })));
});
//# sourceMappingURL=issue-3828.js.map