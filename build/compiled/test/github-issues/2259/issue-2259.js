"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const TableColumn_1 = require("../../../src/schema-builder/table/TableColumn");
const Table_1 = require("../../../src/schema-builder/table/Table");
describe("github issues > #2259 Missing type for generated columns", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Should create table with generated column", () => Promise.all(connections.map(async (connection) => {
        const id = new TableColumn_1.TableColumn({
            name: "id",
            type: "uuid",
            generationStrategy: "uuid",
            isGenerated: true,
            isPrimary: true,
        });
        const client = new Table_1.Table({
            name: "table",
            columns: [id],
        });
        await connection.createQueryRunner().createTable(client);
    })));
});
//# sourceMappingURL=issue-2259.js.map