"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const ExampleEntity_1 = require("./entity/ExampleEntity");
describe("github issues > #9829 Incorrect default value with concat value of function", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [ExampleEntity_1.ExampleEntity],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should get default concat value", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("example_entity");
        const nameColumn = table.findColumnByName("someValue");
        nameColumn.default.should.be.equal("('AA'|| COALESCE(NULL, '1'))");
    })));
});
//# sourceMappingURL=issue-9829.js.map