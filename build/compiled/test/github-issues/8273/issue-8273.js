"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
describe("github issues > #8273 Adding @Generated('uuid') doesn't update column default in PostgreSQL", () => {
    let connections;
    const getColumnDefault = async (queryRunner, columnName) => {
        const query = `SELECT "column_default"` +
            ` FROM "information_schema"."columns"` +
            ` WHERE "table_schema" = 'public' AND "table_name" = 'user' AND "column_name" = '${columnName}'`;
        const res = await queryRunner.query(query);
        return res.length ? res[0]["column_default"] : null;
    };
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
        entities: [User_1.User],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should add DEFAULT value when @Generated('increment') is added", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("user");
        const column = table.findColumnByName("increment");
        const newColumn = column.clone();
        newColumn.isGenerated = true;
        newColumn.generationStrategy = "increment";
        await queryRunner.changeColumn(table, column, newColumn);
        let columnDefault = await getColumnDefault(queryRunner, "increment");
        (0, chai_1.expect)(columnDefault).to.equal("nextval('user_increment_seq'::regclass)");
        await queryRunner.executeMemoryDownSql();
        columnDefault = await getColumnDefault(queryRunner, "increment");
        (0, chai_1.expect)(columnDefault).to.null;
        await queryRunner.release();
    })));
    it("should remove DEFAULT value when @Generated('increment') is removed", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("user");
        const column = table.findColumnByName("incrementWithGenerated");
        const newColumn = column.clone();
        newColumn.isGenerated = false;
        newColumn.generationStrategy = undefined;
        await queryRunner.changeColumn(table, column, newColumn);
        let columnDefault = await getColumnDefault(queryRunner, "incrementWithGenerated");
        (0, chai_1.expect)(columnDefault).to.null;
        await queryRunner.executeMemoryDownSql();
        columnDefault = await getColumnDefault(queryRunner, "incrementWithGenerated");
        (0, chai_1.expect)(columnDefault).to.equal(`nextval('"user_incrementWithGenerated_seq"'::regclass)`);
        await queryRunner.release();
    })));
    it("should add DEFAULT value when @Generated('uuid') is added", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("user");
        const column = table.findColumnByName("uuid");
        const newColumn = column.clone();
        newColumn.isGenerated = true;
        newColumn.generationStrategy = "uuid";
        await queryRunner.changeColumn(table, column, newColumn);
        let columnDefault = await getColumnDefault(queryRunner, "uuid");
        (0, chai_1.expect)(columnDefault).to.equal("uuid_generate_v4()");
        await queryRunner.executeMemoryDownSql();
        columnDefault = await getColumnDefault(queryRunner, "uuid");
        (0, chai_1.expect)(columnDefault).to.null;
        await queryRunner.release();
    })));
    it("should remove DEFAULT value when @Generated('uuid') is removed", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("user");
        const column = table.findColumnByName("uuidWithGenerated");
        const newColumn = column.clone();
        newColumn.isGenerated = false;
        newColumn.generationStrategy = undefined;
        await queryRunner.changeColumn(table, column, newColumn);
        let columnDefault = await getColumnDefault(queryRunner, "uuidWithGenerated");
        (0, chai_1.expect)(columnDefault).to.null;
        await queryRunner.executeMemoryDownSql();
        columnDefault = await getColumnDefault(queryRunner, "uuidWithGenerated");
        (0, chai_1.expect)(columnDefault).to.equal("uuid_generate_v4()");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-8273.js.map