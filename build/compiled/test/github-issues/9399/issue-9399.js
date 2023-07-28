"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #9399 mssql: Column is dropped and recreated in every migration", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["mssql"],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("No migration should be created", () => Promise.all(dataSources.map(async (dataSource) => {
        await dataSource.runMigrations();
        const sqlInMemory = await dataSource.driver
            .createSchemaBuilder()
            .log();
        (0, chai_1.expect)(sqlInMemory.upQueries.length).to.eql(0);
        (0, chai_1.expect)(sqlInMemory.downQueries.length).to.eql(0);
    })));
});
//# sourceMappingURL=issue-9399.js.map