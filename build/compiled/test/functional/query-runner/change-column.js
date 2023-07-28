"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("query runner > change column", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly change column and revert change", () => Promise.all(connections.map(async (connection) => {
        // CockroachDB and Spanner does not allow changing primary columns and renaming constraints
        if (connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "spanner")
            return;
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        const nameColumn = table.findColumnByName("name");
        nameColumn.isUnique.should.be.false;
        nameColumn.default.should.exist;
        const changedNameColumn = nameColumn.clone();
        changedNameColumn.default = undefined;
        changedNameColumn.isUnique = true;
        changedNameColumn.isNullable = true;
        changedNameColumn.length = "500";
        await queryRunner.changeColumn(table, nameColumn, changedNameColumn);
        table = await queryRunner.getTable("post");
        (0, chai_1.expect)(table.findColumnByName("name").default).to.be.undefined;
        table.findColumnByName("name").isUnique.should.be.true;
        table.findColumnByName("name").isNullable.should.be.true;
        // SQLite does not impose any length restrictions
        if (!DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver)) {
            table
                .findColumnByName("name")
                .length.should.be.equal("500");
        }
        const textColumn = table.findColumnByName("text");
        const changedTextColumn = textColumn.clone();
        changedTextColumn.name = "description";
        changedTextColumn.isPrimary = true;
        changedTextColumn.default = "'default text'";
        await queryRunner.changeColumn(table, textColumn, changedTextColumn);
        // column name was changed to 'description'
        table = await queryRunner.getTable("post");
        table.findColumnByName("description").isPrimary.should.be.true;
        table.findColumnByName("description").default.should.exist;
        let idColumn = table.findColumnByName("id");
        let changedIdColumn = idColumn.clone();
        changedIdColumn.isPrimary = false;
        await queryRunner.changeColumn(table, idColumn, changedIdColumn);
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").isPrimary.should.be.false;
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").isPrimary.should.be.true;
        table.findColumnByName("name").default.should.exist;
        table.findColumnByName("name").isUnique.should.be.false;
        table.findColumnByName("name").isNullable.should.be.false;
        table.findColumnByName("text").isPrimary.should.be.false;
        (0, chai_1.expect)(table.findColumnByName("text").default).to.be.undefined;
        await queryRunner.release();
    })));
    it("should correctly change column 'isGenerated' property and revert change", () => Promise.all(connections.map(async (connection) => {
        // CockroachDB and Spanner does not allow changing generated columns in existent tables
        if (connection.driver.options.type === "cockroachdb" ||
            connection.driver.options.type === "spanner")
            return;
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        let idColumn = table.findColumnByName("id");
        let changedIdColumn = idColumn.clone();
        changedIdColumn.isGenerated = true;
        changedIdColumn.generationStrategy = "increment";
        await queryRunner.changeColumn(table, idColumn, changedIdColumn);
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").isGenerated.should.be.true;
        table
            .findColumnByName("id")
            .generationStrategy.should.be.equal("increment");
        await queryRunner.executeMemoryDownSql();
        queryRunner.clearSqlMemory();
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").isGenerated.should.be.false;
        (0, chai_1.expect)(table.findColumnByName("id").generationStrategy).to.be
            .undefined;
        table = await queryRunner.getTable("post");
        idColumn = table.findColumnByName("id");
        changedIdColumn = idColumn.clone();
        changedIdColumn.isPrimary = false;
        await queryRunner.changeColumn(table, idColumn, changedIdColumn);
        // check case when both primary and generated properties set to true
        table = await queryRunner.getTable("post");
        idColumn = table.findColumnByName("id");
        changedIdColumn = idColumn.clone();
        changedIdColumn.isPrimary = true;
        changedIdColumn.isGenerated = true;
        changedIdColumn.generationStrategy = "increment";
        await queryRunner.changeColumn(table, idColumn, changedIdColumn);
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").isGenerated.should.be.true;
        table
            .findColumnByName("id")
            .generationStrategy.should.be.equal("increment");
        await queryRunner.executeMemoryDownSql();
        queryRunner.clearSqlMemory();
        table = await queryRunner.getTable("post");
        table.findColumnByName("id").isGenerated.should.be.false;
        (0, chai_1.expect)(table.findColumnByName("id").generationStrategy).to.be
            .undefined;
        await queryRunner.release();
    })));
    it("should correctly change generated as expression", () => Promise.all(connections.map(async (connection) => {
        const isPostgres = connection.driver.options.type === "postgres";
        const isSpanner = connection.driver.options.type === "spanner";
        const shouldRun = (isPostgres &&
            connection.driver
                .isGeneratedColumnsSupported) ||
            isSpanner;
        if (!shouldRun)
            return;
        const queryRunner = connection.createQueryRunner();
        await (0, test_utils_1.createTypeormMetadataTable)(connection.driver, queryRunner);
        // Database is running < postgres 12
        if (!connection.driver
            .isGeneratedColumnsSupported)
            return;
        let generatedColumn = new src_1.TableColumn({
            name: "generated",
            type: isSpanner ? "string" : "varchar",
            generatedType: "STORED",
            asExpression: "text || tag",
        });
        let table = await queryRunner.getTable("post");
        await queryRunner.addColumn(table, generatedColumn);
        table = await queryRunner.getTable("post");
        generatedColumn = table.findColumnByName("generated");
        generatedColumn.generatedType.should.be.equals("STORED");
        generatedColumn.asExpression.should.be.equals("text || tag");
        let changedGeneratedColumn = generatedColumn.clone();
        changedGeneratedColumn.asExpression = "text || tag || name";
        await queryRunner.changeColumn(table, generatedColumn, changedGeneratedColumn);
        table = await queryRunner.getTable("post");
        generatedColumn = table.findColumnByName("generated");
        generatedColumn.generatedType.should.be.equals("STORED");
        generatedColumn.asExpression.should.be.equals("text || tag || name");
        changedGeneratedColumn = generatedColumn.clone();
        delete changedGeneratedColumn.generatedType;
        await queryRunner.changeColumn(table, generatedColumn, changedGeneratedColumn);
        table = await queryRunner.getTable("post");
        generatedColumn = table.findColumnByName("generated");
        generatedColumn.should.not.haveOwnProperty("generatedType");
        generatedColumn.should.not.haveOwnProperty("asExpression");
        changedGeneratedColumn = generatedColumn.clone();
        changedGeneratedColumn.asExpression = "text || tag || name";
        changedGeneratedColumn.generatedType = "STORED";
        await queryRunner.changeColumn(table, generatedColumn, changedGeneratedColumn);
        table = await queryRunner.getTable("post");
        generatedColumn = table.findColumnByName("generated");
        generatedColumn.generatedType.should.be.equals("STORED");
        generatedColumn.asExpression.should.be.equals("text || tag || name");
    })));
});
//# sourceMappingURL=change-column.js.map