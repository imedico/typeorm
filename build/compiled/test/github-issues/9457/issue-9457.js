"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #9457 No changes in database schema were found, when simple-enum is changed.", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            migrations: [__dirname + "/migration/*{.js,.ts}"],
            schemaCreate: false,
            dropSchema: true,
            enabledDrivers: ["mssql"],
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should drop and recreate 'CHECK' constraint to match enum values", () => Promise.all(dataSources.map(async (dataSource) => {
        await dataSource.runMigrations();
        const sqlInMemory = await dataSource.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries.length).to.eql(2);
        (0, chai_1.expect)(sqlInMemory.upQueries[0].query).to.eql('ALTER TABLE "example_entity" DROP CONSTRAINT "CHK_a80c9d6a2a8749d7aadb857dc6_ENUM"');
        (0, chai_1.expect)(sqlInMemory.upQueries[1].query).to.eql(`ALTER TABLE "example_entity" ADD CONSTRAINT "CHK_be8ed063b3976da24df4213baf_ENUM" CHECK (enumcolumn IN ('enumvalue1','enumvalue2','enumvalue3','enumvalue4'))`);
        (0, chai_1.expect)(sqlInMemory.downQueries.length).to.eql(2);
        (0, chai_1.expect)(sqlInMemory.downQueries[0].query).to.eql('ALTER TABLE "example_entity" DROP CONSTRAINT "CHK_be8ed063b3976da24df4213baf_ENUM"');
        (0, chai_1.expect)(sqlInMemory.downQueries[1].query).to.eql(`ALTER TABLE "example_entity" ADD CONSTRAINT "CHK_a80c9d6a2a8749d7aadb857dc6_ENUM" CHECK (enumcolumn IN ('enumvalue1','enumvalue2','enumvalue3'))`);
    })));
});
//# sourceMappingURL=issue-9457.js.map