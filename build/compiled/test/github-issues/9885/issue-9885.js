"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #9885", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [],
            enabledDrivers: ["mongodb"],
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should be connected", () => {
        dataSources.forEach((dataSource) => {
            (0, chai_1.expect)(dataSource.isInitialized).true;
        });
    });
});
//# sourceMappingURL=issue-9885.js.map