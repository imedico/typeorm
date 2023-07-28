"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Foo_1 = require("./entity/Foo");
describe("github issues > #9690 Incorrect SQL expression if `where` parameter is empty array", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["postgres"],
            entities: [Foo_1.Foo],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should run without throw error", () => Promise.all(dataSources.map(async (dataSource) => {
        const repository = dataSource.getRepository(Foo_1.Foo);
        await repository.find({
            where: [],
        });
    })));
});
//# sourceMappingURL=issue-9690.js.map