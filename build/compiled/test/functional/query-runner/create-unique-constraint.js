"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Table_1 = require("../../../src/schema-builder/table/Table");
const TableUnique_1 = require("../../../src/schema-builder/table/TableUnique");
describe("query runner > create unique constraint", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: [
                "mssql",
                "postgres",
                "sqlite",
                "better-sqlite3",
                "oracle",
                "cockroachdb",
            ],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create unique constraint and revert creation", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        await queryRunner.createTable(new Table_1.Table({
            name: "category",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ],
        }), true);
        await queryRunner.createTable(new Table_1.Table({
            name: "question",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
                },
            ],
        }), true);
        // clear sqls in memory to avoid removing tables when down queries executed.
        queryRunner.clearSqlMemory();
        const categoryUniqueConstraint = new TableUnique_1.TableUnique({
            columnNames: ["name"],
        });
        await queryRunner.createUniqueConstraint("category", categoryUniqueConstraint);
        const questionUniqueConstraint = new TableUnique_1.TableUnique({
            columnNames: ["name", "description"],
        });
        await queryRunner.createUniqueConstraint("question", questionUniqueConstraint);
        let categoryTable = await queryRunner.getTable("category");
        categoryTable.findColumnByName("name").isUnique.should.be.true;
        categoryTable.uniques.length.should.be.equal(1);
        let questionTable = await queryRunner.getTable("question");
        // when unique constraint defined on multiple columns. each of this columns must be non-unique,
        // because they are unique only in complex.
        questionTable.findColumnByName("name").isUnique.should.be
            .false;
        questionTable.findColumnByName("description").isUnique.should
            .be.false;
        questionTable.uniques.length.should.be.equal(1);
        await queryRunner.executeMemoryDownSql();
        categoryTable = await queryRunner.getTable("category");
        categoryTable.findColumnByName("name").isUnique.should.be
            .false;
        categoryTable.uniques.length.should.be.equal(0);
        questionTable = await queryRunner.getTable("question");
        questionTable.findColumnByName("name").isUnique.should.be
            .false;
        questionTable.findColumnByName("description").isUnique.should
            .be.false;
        questionTable.uniques.length.should.be.equal(0);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=create-unique-constraint.js.map