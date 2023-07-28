"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const TestEntity_1 = require("./entities/TestEntity");
const chai_1 = require("chai");
describe("query builder order nulls first/last", async () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entities/*{.js,.ts}"],
            enabledDrivers: ["postgres", "sqlite", "better-sqlite3"],
            schemaCreate: true,
            dropSchema: false,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    const runTest = async (dataSource, firstOrLastString) => {
        const repository = dataSource.getRepository(TestEntity_1.TestEntity);
        const testArray = await repository.find({
            order: {
                testColumn: { direction: "DESC", nulls: firstOrLastString },
            },
        });
        const test = ["first", "FIRST"].indexOf(firstOrLastString) !== -1
            ? testArray.shift()
            : testArray.pop();
        (0, chai_1.expect)(test === null || test === void 0 ? void 0 : test.testColumn).to.be.null;
    };
    it(`should work with uppercase/lowercase first/last`, async () => {
        return Promise.all(dataSources.map(async (dataSource) => {
            const repository = dataSource.getRepository(TestEntity_1.TestEntity);
            for (let i = 0; i < 5; i++) {
                const entity = new TestEntity_1.TestEntity();
                entity.testColumn = "";
                await repository.save(entity);
            }
            for (let i = 0; i < 5; i++) {
                const entity = new TestEntity_1.TestEntity();
                await repository.save(entity);
            }
            await runTest(dataSource, "first");
            await runTest(dataSource, "FIRST");
            await runTest(dataSource, "last");
            await runTest(dataSource, "LAST");
        }));
    });
});
//# sourceMappingURL=issue-8970.js.map