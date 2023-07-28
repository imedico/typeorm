"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #8430 sqlite temporary tables do not honor withoutRowid", () => {
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "better-sqlite3"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should keep 'withoutRowid' after table recreation", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        (0, chai_1.expect)(table.withoutRowid).to.be.true;
        let nameColumn = table.findColumnByName("name");
        const changedColumn = nameColumn.clone();
        changedColumn.name = "changedName";
        await queryRunner.changeColumn(table, nameColumn, changedColumn);
        const changedTable = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(changedTable.withoutRowid).to.be.true;
    })));
});
//# sourceMappingURL=issue-8430.js.map