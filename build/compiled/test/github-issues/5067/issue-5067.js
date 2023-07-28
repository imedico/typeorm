"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #5067 ORA-00972: identifier is too long", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["oracle"],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("generated parameter name is within the size constraints", () => Promise.all(connections.map(async (connection) => {
        const paramName = "output_that_is_really_long_and_must_be_truncated_in_this_driver";
        const createdParameter = await connection.driver.createParameter(paramName, 0);
        (0, chai_1.expect)(createdParameter).to.be.an("String");
        (0, chai_1.expect)(createdParameter.length).to.be.lessThan(30);
    })));
});
//# sourceMappingURL=issue-5067.js.map