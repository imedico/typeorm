"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonExistentColumnName = exports.testColumnName = exports.testTableName = void 0;
require("reflect-metadata");
const chai_1 = require("chai");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
exports.testTableName = "test_table";
exports.testColumnName = "test_column";
exports.nonExistentColumnName = "nonexistent_column";
const createTestTable = async (queryRunner) => {
    await queryRunner.createTable(new src_1.Table({
        name: exports.testTableName,
        columns: [
            {
                name: "id",
                type: "integer",
                isPrimary: true,
            },
            {
                name: exports.testColumnName,
                type: "varchar",
            },
        ],
    }));
};
describe("github issues > #6195 feature: fake migrations for existing tables", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: false,
            dropSchema: false,
            migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
            // logging: true,
        });
        await (0, test_utils_1.reloadTestingDatabases)(dataSources);
        for (const dataSource of dataSources) {
            const queryRunner = dataSource.createQueryRunner();
            await dataSource.showMigrations(); // To initialize migrations table
            await createTestTable(queryRunner);
            await queryRunner.release();
        }
    });
    after(async () => {
        await (0, test_utils_1.closeTestingConnections)(dataSources);
    });
    describe("fake run tests", () => {
        it("should fail for duplicate column", async () => {
            for (const dataSource of dataSources) {
                if (dataSource.options.type === "mongodb")
                    return;
                await (0, chai_1.expect)(dataSource.runMigrations({ transaction: "all" })).to.be.rejectedWith(Error);
            }
        });
        it("should not fail for duplicate column when run with the fake option", async () => {
            for (const dataSource of dataSources) {
                if (dataSource.options.type === "mongodb")
                    return;
                await (0, chai_1.expect)(dataSource.runMigrations({
                    transaction: "all",
                    fake: true,
                })).not.to.be.rejectedWith(Error);
            }
        });
    });
    describe("fake rollback tests", () => {
        before(async () => {
            for (const dataSource of dataSources) {
                if (dataSource.options.type === "mongodb")
                    return;
                await dataSource.runMigrations({
                    transaction: "all",
                    fake: true,
                });
            }
        });
        it("should fail for non-existent column", async () => {
            for (const dataSource of dataSources) {
                if (dataSource.options.type === "mongodb")
                    return;
                await (0, chai_1.expect)(dataSource.undoLastMigration({ transaction: "all" })).to.be.rejectedWith(Error);
            }
        });
        it("should not fail for non-existent column when run with the fake option", async () => {
            for (const dataSource of dataSources) {
                if (dataSource.options.type === "mongodb")
                    return;
                await (0, chai_1.expect)(dataSource.undoLastMigration({
                    transaction: "all",
                    fake: true,
                })).not.to.be.rejectedWith(Error);
            }
        });
    });
});
//# sourceMappingURL=issue-6195.js.map