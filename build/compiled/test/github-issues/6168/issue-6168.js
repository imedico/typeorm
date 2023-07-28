"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Table_1 = require("../../../src/schema-builder/table/Table");
const chai_1 = require("chai");
const questionName = "question";
const categoryName = "category";
const createTables = async (queryRunner, dbName) => {
    const questionTableName = `${dbName}.${questionName}`;
    const categoryTableName = `${dbName}.${categoryName}`;
    await queryRunner.createTable(new Table_1.Table({
        name: questionTableName,
        columns: [
            {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            },
            {
                name: "name",
                type: "varchar",
            },
        ],
    }), true);
    await queryRunner.createTable(new Table_1.Table({
        name: categoryTableName,
        columns: [
            {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            },
            {
                name: "questionId",
                type: "int",
            },
        ],
        foreignKeys: [
            {
                columnNames: ["questionId"],
                referencedTableName: questionTableName,
                referencedColumnNames: ["id"],
                name: "FK_CATEGORY_QUESTION",
            },
        ],
    }), true);
};
describe("github issues > #6168 fix multiple foreign keys with the same name in a mysql multi-tenanted DB", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            schemaCreate: false,
            dropSchema: false,
        });
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        for (const connection of connections) {
            const queryRunner = connection.createQueryRunner();
            await createTables(queryRunner, String(connection.driver.database));
            await queryRunner.createDatabase("test2", true);
            await createTables(queryRunner, "test2");
            await queryRunner.release();
        }
    });
    after(async () => {
        for (const connection of connections) {
            const queryRunner = connection.createQueryRunner();
            await queryRunner.dropDatabase("test2");
            await queryRunner.release();
        }
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
    it("should only have one foreign key column", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const tables = await queryRunner.getTables([
            questionName,
            categoryName,
        ]);
        const questionTable = tables.find((table) => table.name === questionName);
        const categoryTable = tables.find((table) => table.name === categoryName);
        queryRunner.release();
        (0, chai_1.expect)(categoryTable.foreignKeys.length).to.eq(1);
        (0, chai_1.expect)(categoryTable.foreignKeys[0].name).to.eq("FK_CATEGORY_QUESTION");
        (0, chai_1.expect)(categoryTable.foreignKeys[0].columnNames.length).to.eq(1); // before the fix this was 2, one for each schema
        (0, chai_1.expect)(categoryTable.foreignKeys[0].columnNames[0]).to.eq("questionId");
        (0, chai_1.expect)(questionTable.foreignKeys.length).to.eq(0);
    })));
});
//# sourceMappingURL=issue-6168.js.map