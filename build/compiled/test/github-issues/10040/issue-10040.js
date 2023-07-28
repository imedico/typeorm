"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const person_1 = require("./entity/person");
const todo_1 = require("./entity/todo");
describe("github issues > #10040 TypeORM synchronize database even if it is up to date", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [person_1.Person, todo_1.Todo],
            enabledDrivers: ["mysql"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should return an empty array for the upQueries after sync", async () => {
        await Promise.all(dataSources.map(async (dataSource) => {
            await dataSource.synchronize();
            const logs = await dataSource.driver.createSchemaBuilder().log();
            (0, chai_1.expect)(logs.upQueries.length).to.be.eql(0);
        }));
    });
});
//# sourceMappingURL=issue-10040.js.map