"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const src_1 = require("../../../../../src");
const test_utils_1 = require("../../../../utils/test-utils");
const chai_1 = require("chai");
describe("database schema > generated columns > postgres", () => {
    let dataSources;
    before(async function () {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
            schemaCreate: false,
            dropSchema: true,
        });
        // generated columns supported from Postgres 12
        if (dataSources[0] &&
            !dataSources[0].driver
                .isGeneratedColumnsSupported) {
            this.skip();
            return;
        }
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should not generate queries when no model changes", () => Promise.all(dataSources.map(async (dataSource) => {
        const sqlInMemory = await dataSource.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.equal(0);
        sqlInMemory.downQueries.length.should.be.equal(0);
    })));
    it("should create table with generated columns", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        let table = await queryRunner.getTable("post");
        const storedFullName = table.findColumnByName("storedFullName");
        const name = table.findColumnByName("name");
        const nameHash = table.findColumnByName("nameHash");
        storedFullName.asExpression.should.be.equal(`' ' || COALESCE("firstName", '') || ' ' || COALESCE("lastName", '')`);
        storedFullName.generatedType.should.be.equal("STORED");
        name.generatedType.should.be.equal("STORED");
        name.asExpression.should.be.equal(`"firstName" || "lastName"`);
        nameHash.generatedType.should.be.equal("STORED");
        nameHash.asExpression.should.be.equal(`md5(coalesce("firstName",'0'))`);
        nameHash.length.should.be.equal("255");
        nameHash.isNullable.should.be.true;
        await queryRunner.release();
    })));
    it("should add generated column and revert add", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        let table = await queryRunner.getTable("post");
        let storedColumn = new src_1.TableColumn({
            name: "storedColumn",
            type: "varchar",
            length: "200",
            generatedType: "STORED",
            asExpression: `"firstName" || "lastName"`,
        });
        await queryRunner.addColumn(table, storedColumn);
        table = await queryRunner.getTable("post");
        storedColumn = table.findColumnByName("storedColumn");
        storedColumn.should.be.exist;
        storedColumn.generatedType.should.be.equal("STORED");
        storedColumn.asExpression.should.be.equal(`"firstName" || "lastName"`);
        // revert changes
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        (0, chai_1.expect)(table.findColumnByName("column")).to.be.undefined;
        // check if generated column records removed from typeorm_metadata table
        const metadataRecords = await queryRunner.query(`SELECT * FROM "typeorm_metadata" WHERE "table" = 'post' AND "name" = 'storedColumn'`);
        metadataRecords.length.should.be.equal(0);
        await queryRunner.release();
    })));
    it("should drop generated column and revert drop", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        let table = await queryRunner.getTable("post");
        await queryRunner.dropColumn(table, "storedFullName");
        table = await queryRunner.getTable("post");
        (0, chai_1.expect)(table.findColumnByName("storedFullName")).to.be
            .undefined;
        // check if generated column records removed from typeorm_metadata table
        const metadataRecords = await queryRunner.query(`SELECT * FROM "typeorm_metadata" WHERE "table" = 'post' AND "name" = 'storedFullName'`);
        metadataRecords.length.should.be.equal(0);
        // revert changes
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        const storedFullName = table.findColumnByName("storedFullName");
        storedFullName.should.be.exist;
        storedFullName.generatedType.should.be.equal("STORED");
        storedFullName.asExpression.should.be.equal(`' ' || COALESCE("firstName", '') || ' ' || COALESCE("lastName", '')`);
        await queryRunner.release();
    })));
    it("should change generated column and revert change", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        let table = await queryRunner.getTable("post");
        let storedFullName = table.findColumnByName("storedFullName");
        const changedStoredFullName = storedFullName.clone();
        changedStoredFullName.asExpression = `'Mr.' || ' ' || COALESCE("firstName", '') || ' ' || COALESCE("lastName", '')`;
        let name = table.findColumnByName("name");
        const changedName = name.clone();
        changedName.generatedType = undefined;
        changedName.asExpression = undefined;
        await queryRunner.changeColumns(table, [
            {
                oldColumn: storedFullName,
                newColumn: changedStoredFullName,
            },
            { oldColumn: name, newColumn: changedName },
        ]);
        table = await queryRunner.getTable("post");
        storedFullName = table.findColumnByName("storedFullName");
        storedFullName.asExpression.should.be.equal(`'Mr.' || ' ' || COALESCE("firstName", '') || ' ' || COALESCE("lastName", '')`);
        name = table.findColumnByName("name");
        (0, chai_1.expect)(name.generatedType).to.be.undefined;
        (0, chai_1.expect)(name.asExpression).to.be.undefined;
        // check if generated column records removed from typeorm_metadata table
        const metadataRecords = await queryRunner.query(`SELECT * FROM "typeorm_metadata" WHERE "table" = 'post' AND "name" = 'name'`);
        metadataRecords.length.should.be.equal(0);
        // revert changes
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        storedFullName = table.findColumnByName("storedFullName");
        storedFullName.asExpression.should.be.equal(`' ' || COALESCE("firstName", '') || ' ' || COALESCE("lastName", '')`);
        name = table.findColumnByName("name");
        name.generatedType.should.be.equal("STORED");
        name.asExpression.should.be.equal(`"firstName" || "lastName"`);
        await queryRunner.release();
    })));
    it("should remove data from 'typeorm_metadata' when table dropped", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        const table = await queryRunner.getTable("post");
        const generatedColumns = table.columns.filter((it) => it.generatedType);
        await queryRunner.dropTable(table);
        // check if generated column records removed from typeorm_metadata table
        let metadataRecords = await queryRunner.query(`SELECT * FROM "typeorm_metadata" WHERE "table" = 'post'`);
        metadataRecords.length.should.be.equal(0);
        // revert changes
        await queryRunner.executeMemoryDownSql();
        metadataRecords = await queryRunner.query(`SELECT * FROM "typeorm_metadata" WHERE "table" = 'post'`);
        metadataRecords.length.should.be.equal(generatedColumns.length);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=generated-columns-postgres.js.map