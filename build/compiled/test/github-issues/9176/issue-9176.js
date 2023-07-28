"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Author_1 = require("./entity/Author");
const Post_1 = require("./entity/Post");
const User_1 = require("./entity/User");
const _1656926770819_CreatePostTable_1 = require("./migration/1656926770819-CreatePostTable");
const _1656939116999_CreateAuthorTable_1 = require("./migration/1656939116999-CreateAuthorTable");
const _1656939646470_AddAuthorIdColumn_1 = require("./migration/1656939646470-AddAuthorIdColumn");
const _1657066872930_CreateUserTable_1 = require("./migration/1657066872930-CreateUserTable");
const _1657067039714_CreateUniqueConstraintToUser_1 = require("./migration/1657067039714-CreateUniqueConstraintToUser");
const _1657067039715_CreateCheckedUserTable_1 = require("./migration/1657067039715-CreateCheckedUserTable");
const _1657067039716_CreateCheckConstraintToUser_1 = require("./migration/1657067039716-CreateCheckConstraintToUser");
const chai_1 = require("chai");
describe("github issues > #9176 The names of foreign keys created by queryRunner.createForeignKey and schema:sync are different with SQLite", () => {
    describe("github issues > #9176 foreign keys", () => {
        let dataSources;
        before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [Author_1.Author, Post_1.Post],
            enabledDrivers: ["sqlite"],
            migrations: [
                _1656926770819_CreatePostTable_1.CreatePostTable1656926770819,
                _1656939116999_CreateAuthorTable_1.CreateAuthorTable1656939116999,
                _1656939646470_AddAuthorIdColumn_1.AddAuthorIdColumn1656939646470,
            ],
            schemaCreate: false,
            dropSchema: true,
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
        it("should not generate queries when created foreign key with queryRunnner.createForeignKey", () => Promise.all(dataSources.map(async (dataSource) => {
            await dataSource.runMigrations();
            const sqlInMemory = await dataSource.driver
                .createSchemaBuilder()
                .log();
            (0, chai_1.expect)(sqlInMemory.upQueries).to.empty;
            (0, chai_1.expect)(sqlInMemory.downQueries).to.empty;
        })));
    });
    describe("github issues > #9176 unique constraint", () => {
        let dataSources;
        before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [User_1.User],
            enabledDrivers: ["sqlite"],
            migrations: [
                _1657066872930_CreateUserTable_1.CreateUserTable1657066872930,
                _1657067039714_CreateUniqueConstraintToUser_1.CreateUniqueConstraintToUser1657067039714,
            ],
            schemaCreate: false,
            dropSchema: true,
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
        it("should not generate queries when created unique constraint with queryRunnner.createUniqueConstraint", () => Promise.all(dataSources.map(async (dataSource) => {
            await dataSource.runMigrations();
            const sqlInMemory = await dataSource.driver
                .createSchemaBuilder()
                .log();
            (0, chai_1.expect)(sqlInMemory.upQueries).to.empty;
            (0, chai_1.expect)(sqlInMemory.downQueries).to.empty;
        })));
    });
    describe("github issues > #9176 check constraint", () => {
        let dataSources;
        before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [User_1.CheckedUser],
            enabledDrivers: ["sqlite"],
            migrations: [
                _1657067039715_CreateCheckedUserTable_1.CreateCheckedUserTable1657067039715,
                _1657067039716_CreateCheckConstraintToUser_1.CreateCheckConstraintToUser1657067039716,
            ],
            schemaCreate: false,
            dropSchema: true,
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
        it("should not generate queries when created check constraint with queryRunnner.createCheckConstraint", () => Promise.all(dataSources.map(async (dataSource) => {
            await dataSource.runMigrations();
            const sqlInMemory = await dataSource.driver
                .createSchemaBuilder()
                .log();
            (0, chai_1.expect)(sqlInMemory.upQueries).to.empty;
            (0, chai_1.expect)(sqlInMemory.downQueries).to.empty;
        })));
    });
});
//# sourceMappingURL=issue-9176.js.map