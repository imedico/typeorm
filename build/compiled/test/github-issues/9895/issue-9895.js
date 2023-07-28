"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const ExampleEntity_1 = require("./entity/ExampleEntity");
describe("github issues > #9895", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [ExampleEntity_1.ExampleEntity],
            enabledDrivers: ["postgres"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should allow find order on object property", async () => {
        await Promise.all(dataSources.map(async (dataSource) => {
            await dataSource.manager.find(ExampleEntity_1.ExampleEntity, {
                order: {
                    total: "DESC",
                },
            });
        }));
    });
});
//# sourceMappingURL=issue-9895.js.map