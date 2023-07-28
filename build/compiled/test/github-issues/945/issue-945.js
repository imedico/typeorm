"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #945 synchronization with multiple primary keys", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("schema should include two primary keys", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("test_entity");
        if (table) {
            const firstId = table.columns.find((column) => column.name === "id1");
            const secondId = table.columns.find((column) => column.name === "id2");
            (0, chai_1.expect)(table.columns.filter((column) => column.isPrimary)).length(2);
            (0, chai_1.expect)(firstId).not.to.be.undefined;
            (0, chai_1.expect)(secondId).not.to.be.undefined;
        }
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-945.js.map