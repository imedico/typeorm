"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #4658 Renaming a column with current_timestamp(6) results in broken SQL", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql", "mariadb"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly rename column and revert rename", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("user");
        await queryRunner.renameColumn(table, "created_at", "createdAt");
        await queryRunner.renameColumn(table, "updated_at", "updatedAt");
        table = await queryRunner.getTable("user");
        (0, chai_1.expect)(table.findColumnByName("created_at")).to.be.undefined;
        (0, chai_1.expect)(table.findColumnByName("updated_at")).to.be.undefined;
        table.findColumnByName("createdAt").should.be.exist;
        table.findColumnByName("updatedAt").should.be.exist;
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("user");
        table.findColumnByName("created_at").should.be.exist;
        table.findColumnByName("updated_at").should.be.exist;
        (0, chai_1.expect)(table.findColumnByName("createdAt")).to.be.undefined;
        (0, chai_1.expect)(table.findColumnByName("updatedAt")).to.be.undefined;
        await queryRunner.release();
    })));
    it("should correctly remove column and revert it back", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("user");
        await queryRunner.dropColumn(table, "created_at");
        await queryRunner.dropColumn(table, "updated_at");
        table = await queryRunner.getTable("user");
        (0, chai_1.expect)(table.findColumnByName("created_at")).to.be.undefined;
        (0, chai_1.expect)(table.findColumnByName("updated_at")).to.be.undefined;
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("user");
        table.findColumnByName("created_at").should.be.exist;
        table.findColumnByName("updated_at").should.be.exist;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-4658.js.map