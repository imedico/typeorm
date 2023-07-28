"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const ExampleEntity_1 = require("./entity/ExampleEntity");
const chai_1 = require("chai");
describe("github issues > #9960", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [ExampleEntity_1.ExampleEntity],
            enabledDrivers: ["postgres"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("select + order by must work without issues", async () => {
        await Promise.all(dataSources.map(async (dataSource) => {
            const example1 = new ExampleEntity_1.ExampleEntity();
            example1.name = "example #1";
            await dataSource.manager.save(example1);
            const examples = await dataSource.manager
                .createQueryBuilder(ExampleEntity_1.ExampleEntity, "example")
                .select(["example.id", "example.name"])
                .addOrderBy("example.name", "DESC", "NULLS LAST")
                .take(1)
                .skip(0)
                .getMany();
            (0, chai_1.expect)(examples).to.be.eql([{ id: 1, name: "example #1" }]);
        }));
    });
});
//# sourceMappingURL=issue-9960.js.map