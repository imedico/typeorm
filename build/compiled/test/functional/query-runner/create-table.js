"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Table_1 = require("../../../src/schema-builder/table/Table");
const Post_1 = require("./entity/Post");
const Photo_1 = require("./entity/Photo");
const Book_1 = require("./entity/Book");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("query runner > create table", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create table from simple object and revert creation", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let numericType = "int";
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver)) {
            numericType = "integer";
        }
        else if (connection.driver.options.type === "spanner") {
            numericType = "int64";
        }
        const options = {
            name: "category",
            columns: [
                {
                    name: "id",
                    type: numericType,
                    isPrimary: true,
                    isGenerated: connection.driver.options.type === "spanner"
                        ? false
                        : true,
                    generationStrategy: connection.driver.options.type === "spanner"
                        ? undefined
                        : "increment",
                },
                {
                    name: "name",
                    type: connection.driver.options.type === "spanner"
                        ? "string"
                        : "varchar",
                    isUnique: true,
                    isNullable: false,
                },
            ],
        };
        await queryRunner.createTable(new Table_1.Table(options), true);
        let table = await queryRunner.getTable("category");
        const idColumn = table.findColumnByName("id");
        const nameColumn = table.findColumnByName("name");
        idColumn.should.be.exist;
        idColumn.isPrimary.should.be.true;
        if (connection.driver.options.type === "spanner") {
            idColumn.isGenerated.should.be.false;
            (0, chai_1.expect)(idColumn.generationStrategy).to.be.undefined;
        }
        else {
            idColumn.isGenerated.should.be.true;
            idColumn.generationStrategy.should.be.equal("increment");
        }
        nameColumn.should.be.exist;
        nameColumn.isUnique.should.be.true;
        table.should.exist;
        if (!(DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")) {
            table.uniques.length.should.be.equal(1);
        }
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("category");
        (0, chai_1.expect)(table).to.be.undefined;
        await queryRunner.release();
    })));
    it("should correctly create table from Entity", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const metadata = connection.getMetadata(Post_1.Post);
        const newTable = Table_1.Table.create(metadata, connection.driver);
        await queryRunner.createTable(newTable);
        const table = await queryRunner.getTable("post");
        const idColumn = table.findColumnByName("id");
        const versionColumn = table.findColumnByName("version");
        const nameColumn = table.findColumnByName("name");
        table.should.exist;
        if (!(DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner")) {
            table.uniques.length.should.be.equal(2);
            table.checks.length.should.be.equal(1);
        }
        idColumn.isPrimary.should.be.true;
        versionColumn.isUnique.should.be.true;
        // Spanner does not support DEFAULT values
        if (!(connection.driver.options.type === "spanner")) {
            nameColumn.default.should.be.exist;
        }
        await queryRunner.release();
    })));
    it("should correctly create table with all dependencies and revert creation", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let numericType = "int";
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver)) {
            numericType = "integer";
        }
        else if (connection.driver.options.type === "spanner") {
            numericType = "int64";
        }
        let stringType = "varchar";
        if (connection.driver.options.type === "spanner") {
            stringType = "string";
        }
        await queryRunner.createTable(new Table_1.Table({
            name: "person",
            columns: [
                {
                    name: "id",
                    type: numericType,
                    isPrimary: true,
                },
                {
                    name: "userId",
                    type: numericType,
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: stringType,
                },
            ],
        }), true);
        const questionTableOptions = {
            name: "question",
            columns: [
                {
                    name: "id",
                    type: numericType,
                    isPrimary: true,
                    isGenerated: connection.driver.options.type === "spanner"
                        ? false
                        : true,
                    generationStrategy: connection.driver.options.type === "spanner"
                        ? undefined
                        : "increment",
                },
                {
                    name: "name",
                    type: stringType,
                },
                {
                    name: "text",
                    type: stringType,
                    isNullable: false,
                },
                {
                    name: "authorId",
                    type: numericType,
                },
                {
                    name: "authorUserId",
                    type: numericType,
                },
            ],
            indices: [
                {
                    columnNames: ["authorId", "authorUserId"],
                    isUnique: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["authorId", "authorUserId"],
                    referencedTableName: "person",
                    referencedColumnNames: ["id", "userId"],
                },
            ],
        };
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            questionTableOptions.indices.push({
                columnNames: ["name", "text"],
            });
        }
        else {
            questionTableOptions.uniques = [
                { columnNames: ["name", "text"] },
            ];
            questionTableOptions.checks = [
                {
                    expression: `${connection.driver.escape("name")} <> 'ASD'`,
                },
            ];
        }
        await queryRunner.createTable(new Table_1.Table(questionTableOptions), true);
        const categoryTableOptions = {
            name: "category",
            columns: [
                {
                    name: "id",
                    type: numericType,
                    isPrimary: true,
                    isGenerated: connection.driver.options.type === "spanner"
                        ? false
                        : true,
                    generationStrategy: connection.driver.options.type === "spanner"
                        ? undefined
                        : "increment",
                },
                {
                    name: "name",
                    type: stringType,
                    default: "'default category'",
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: "alternativeName",
                    type: stringType,
                },
                {
                    name: "questionId",
                    type: numericType,
                    isUnique: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ["questionId"],
                    referencedTableName: "question",
                    referencedColumnNames: ["id"],
                },
            ],
        };
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            categoryTableOptions.indices = [
                { columnNames: ["name", "alternativeName"] },
            ];
        }
        else {
            categoryTableOptions.uniques = [
                { columnNames: ["name", "alternativeName"] },
            ];
        }
        // When we mark column as unique, MySql create index for that column and we don't need to create index separately.
        if (!(DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "oracle" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner"))
            categoryTableOptions.indices = [
                { columnNames: ["questionId"] },
            ];
        await queryRunner.createTable(new Table_1.Table(categoryTableOptions), true);
        let personTable = await queryRunner.getTable("person");
        const personIdColumn = personTable.findColumnByName("id");
        const personUserIdColumn = personTable.findColumnByName("id");
        personIdColumn.isPrimary.should.be.true;
        personUserIdColumn.isPrimary.should.be.true;
        personTable.should.exist;
        let questionTable = await queryRunner.getTable("question");
        const questionIdColumn = questionTable.findColumnByName("id");
        questionIdColumn.isPrimary.should.be.true;
        if (!(connection.driver.options.type === "spanner")) {
            questionIdColumn.isGenerated.should.be.true;
            questionIdColumn.generationStrategy.should.be.equal("increment");
        }
        questionTable.should.exist;
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            // MySql, SAP HANA and Spanner does not have unique constraints.
            // all unique constraints are unique indexes.
            questionTable.uniques.length.should.be.equal(0);
            questionTable.indices.length.should.be.equal(2);
        }
        else if (connection.driver.options.type === "cockroachdb") {
            // CockroachDB stores unique indices as UNIQUE constraints
            questionTable.uniques.length.should.be.equal(2);
            questionTable.uniques[0].columnNames.length.should.be.equal(2);
            questionTable.uniques[1].columnNames.length.should.be.equal(2);
            questionTable.indices.length.should.be.equal(0);
            questionTable.checks.length.should.be.equal(1);
        }
        else {
            questionTable.uniques.length.should.be.equal(1);
            questionTable.uniques[0].columnNames.length.should.be.equal(2);
            questionTable.indices.length.should.be.equal(1);
            questionTable.indices[0].columnNames.length.should.be.equal(2);
            questionTable.checks.length.should.be.equal(1);
        }
        questionTable.foreignKeys.length.should.be.equal(1);
        questionTable.foreignKeys[0].columnNames.length.should.be.equal(2);
        questionTable.foreignKeys[0].referencedColumnNames.length.should.be.equal(2);
        let categoryTable = await queryRunner.getTable("category");
        const categoryTableIdColumn = categoryTable.findColumnByName("id");
        categoryTableIdColumn.isPrimary.should.be.true;
        if (!(connection.driver.options.type === "spanner")) {
            categoryTableIdColumn.isGenerated.should.be.true;
            categoryTableIdColumn.generationStrategy.should.be.equal("increment");
        }
        categoryTable.should.exist;
        categoryTable.foreignKeys.length.should.be.equal(1);
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            // MySql, SAP HANA and Spanner does not have unique constraints. All unique constraints are unique indexes.
            categoryTable.indices.length.should.be.equal(3);
        }
        else if (connection.driver.options.type === "oracle") {
            // Oracle does not allow to put index on primary or unique columns.
            categoryTable.indices.length.should.be.equal(0);
        }
        else {
            categoryTable.uniques.length.should.be.equal(3);
            categoryTable.indices.length.should.be.equal(1);
        }
        await queryRunner.executeMemoryDownSql();
        questionTable = await queryRunner.getTable("question");
        categoryTable = await queryRunner.getTable("category");
        personTable = await queryRunner.getTable("person");
        (0, chai_1.expect)(questionTable).to.be.undefined;
        (0, chai_1.expect)(categoryTable).to.be.undefined;
        (0, chai_1.expect)(personTable).to.be.undefined;
        await queryRunner.release();
    })));
    it("should correctly create table with different `Unique` definitions", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const metadata = connection.getMetadata(Photo_1.Photo);
        const newTable = Table_1.Table.create(metadata, connection.driver);
        await queryRunner.createTable(newTable);
        let table = await queryRunner.getTable("photo");
        const nameColumn = table.findColumnByName("name");
        const tagColumn = table.findColumnByName("tag");
        const descriptionColumn = table.findColumnByName("description");
        const textColumn = table.findColumnByName("text");
        table.should.exist;
        nameColumn.isUnique.should.be.true;
        descriptionColumn.isUnique.should.be.true;
        if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver) ||
            connection.driver.options.type === "aurora-mysql" ||
            connection.driver.options.type === "sap" ||
            connection.driver.options.type === "spanner") {
            table.uniques.length.should.be.equal(0);
            table.indices.length.should.be.equal(4);
            tagColumn.isUnique.should.be.true;
            textColumn.isUnique.should.be.true;
        }
        else if (connection.driver.options.type === "cockroachdb") {
            // CockroachDB stores unique indices as UNIQUE constraints
            table.uniques.length.should.be.equal(4);
            table.indices.length.should.be.equal(0);
            tagColumn.isUnique.should.be.true;
            textColumn.isUnique.should.be.true;
        }
        else {
            table.uniques.length.should.be.equal(2);
            table.indices.length.should.be.equal(2);
            tagColumn.isUnique.should.be.false;
            textColumn.isUnique.should.be.false;
        }
        await queryRunner.executeMemoryDownSql();
        table = await queryRunner.getTable("photo");
        (0, chai_1.expect)(table).to.be.undefined;
        await queryRunner.release();
    })));
    it("should correctly create table with different `withoutRowid` definitions", () => Promise.all(connections.map(async (connection) => {
        if (!DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver))
            return;
        const queryRunner = connection.createQueryRunner();
        // the table 'book' must contain a 'rowid' column
        const metadataBook = connection.getMetadata(Book_1.Book);
        const newTableBook = Table_1.Table.create(metadataBook, connection.driver);
        await queryRunner.createTable(newTableBook);
        const aBook = new Book_1.Book();
        aBook.ean = "asdf";
        await connection.manager.save(aBook);
        const desc = await connection.manager.query("SELECT rowid FROM book WHERE ean = 'asdf'");
        (0, chai_1.expect)(desc[0].rowid).equals(1);
        await queryRunner.dropTable("book");
        const bookTableIsGone = await queryRunner.getTable("book");
        (0, chai_1.expect)(bookTableIsGone).to.be.undefined;
        // the table 'book2' must NOT contain a 'rowid' column
        const metadataBook2 = connection.getMetadata(Book_1.Book2);
        const newTableBook2 = Table_1.Table.create(metadataBook2, connection.driver);
        await queryRunner.createTable(newTableBook2);
        try {
            await connection.manager.query("SELECT rowid FROM book2");
        }
        catch (e) {
            (0, chai_1.expect)(e.message).contains("no such column: rowid");
        }
        await queryRunner.dropTable("book2");
        const book2TableIsGone = await queryRunner.getTable("book2");
        (0, chai_1.expect)(book2TableIsGone).to.be.undefined;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-table.js.map