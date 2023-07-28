"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Document_1 = require("./entity/Document");
const Album_1 = require("./entity/Album");
const Photo_1 = require("./entity/Photo");
describe("github issues > #5898 Postgres primary key of type uuid: default value migration/sync not working", () => {
    let connections;
    const getColumnDefault = async (queryRunner, tableName, columnName) => {
        const query = `SELECT "column_default"` +
            ` FROM "information_schema"."columns"` +
            ` WHERE "table_schema" = 'public' AND "table_name" = '${tableName}' AND "column_name" = '${columnName}'`;
        const res = await queryRunner.query(query);
        return res.length ? res[0]["column_default"] : null;
    };
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
        entities: [User_1.User, Document_1.Document, Album_1.Album, Photo_1.Photo],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should add DEFAULT value when @PrimaryGeneratedColumn('increment') is added", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("photo");
        const column = table.findColumnByName("id");
        const newColumn = column.clone();
        newColumn.isGenerated = true;
        newColumn.generationStrategy = "increment";
        await queryRunner.changeColumn(table, column, newColumn);
        let columnDefault = await getColumnDefault(queryRunner, "photo", "id");
        (0, chai_1.expect)(columnDefault).to.equal("nextval('photo_id_seq'::regclass)");
        await queryRunner.executeMemoryDownSql();
        columnDefault = await getColumnDefault(queryRunner, "photo", "id");
        (0, chai_1.expect)(columnDefault).to.null;
        await queryRunner.release();
    })));
    it("should remove DEFAULT value when @PrimaryGeneratedColumn('increment') is removed", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("album");
        const column = table.findColumnByName("id");
        const newColumn = column.clone();
        newColumn.isGenerated = false;
        newColumn.generationStrategy = undefined;
        await queryRunner.changeColumn(table, column, newColumn);
        let columnDefault = await getColumnDefault(queryRunner, "album", "id");
        (0, chai_1.expect)(columnDefault).to.null;
        await queryRunner.executeMemoryDownSql();
        columnDefault = await getColumnDefault(queryRunner, "album", "id");
        (0, chai_1.expect)(columnDefault).to.equal(`nextval('album_id_seq'::regclass)`);
        await queryRunner.release();
    })));
    it("should add DEFAULT value when @PrimaryGeneratedColumn('uuid') is added", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("document");
        const column = table.findColumnByName("id");
        const newColumn = column.clone();
        newColumn.isGenerated = true;
        newColumn.generationStrategy = "uuid";
        await queryRunner.changeColumn(table, column, newColumn);
        let columnDefault = await getColumnDefault(queryRunner, "document", "id");
        (0, chai_1.expect)(columnDefault).to.equal("uuid_generate_v4()");
        await queryRunner.executeMemoryDownSql();
        columnDefault = await getColumnDefault(queryRunner, "document", "id");
        (0, chai_1.expect)(columnDefault).to.null;
        await queryRunner.release();
    })));
    it("should remove DEFAULT value when @PrimaryGeneratedColumn('uuid') is removed", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("user");
        const column = table.findColumnByName("id");
        const newColumn = column.clone();
        newColumn.isGenerated = false;
        newColumn.generationStrategy = undefined;
        await queryRunner.changeColumn(table, column, newColumn);
        let columnDefault = await getColumnDefault(queryRunner, "user", "id");
        (0, chai_1.expect)(columnDefault).to.null;
        await queryRunner.executeMemoryDownSql();
        columnDefault = await getColumnDefault(queryRunner, "user", "id");
        (0, chai_1.expect)(columnDefault).to.equal("uuid_generate_v4()");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-5898.js.map