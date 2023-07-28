"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Foo_1 = require("./entity/Foo");
describe("github issues > #9684 Incorrect enum default value when table name contains dash character", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Foo_1.Foo],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should get default enum value", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("module-foo_table_x");
        const nameColumn = table.findColumnByName("enumStatus");
        nameColumn.default.should.be.equal("'draft'");
    })));
});
//# sourceMappingURL=issue-9684.js.map