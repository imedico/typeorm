"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const UserEntity_1 = require("./entity/UserEntity");
describe("github issues > #5478 Setting enumName doesn't change how migrations get generated", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        migrations: [],
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
        entities: [UserEntity_1.UserEntity],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly rename enum", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        // add `enumName`
        let table = await queryRunner.getTable("user");
        const column = table.findColumnByName("userType");
        const newColumn = column.clone();
        newColumn.enumName = "UserTypeEnum";
        // change column
        await queryRunner.changeColumn(table, column, newColumn);
        // check if `enumName` changed
        table = await queryRunner.getTable("user");
        let changedColumn = table.findColumnByName("userType");
        (0, chai_1.expect)(changedColumn.enumName).to.equal("UserTypeEnum");
        // revert changes
        await queryRunner.executeMemoryDownSql();
        // check if `enumName` reverted
        table = await queryRunner.getTable("user");
        changedColumn = table.findColumnByName("userType");
        (0, chai_1.expect)(changedColumn.enumName).to.undefined;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-5478.js.map