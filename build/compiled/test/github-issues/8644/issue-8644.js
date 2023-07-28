"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const my_table_entity_1 = require("./entity/my-table.entity");
describe("github issues > #8644 BUG - Special keyword column name for simple-enum in sqlite", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "better-sqlite3"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("it should be able to set special keyword as column name for simple-enum types", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(my_table_entity_1.MyTable);
        await repository.insert({ limit: my_table_entity_1.Limit.Bar });
    })));
});
//# sourceMappingURL=issue-8644.js.map