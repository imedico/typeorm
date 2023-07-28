"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #7203 QueryExpressionMap doesn't clone comment field", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to clone comment field", () => Promise.all(connections.map(async (connection) => {
        const comment = "a comment";
        const queryBuilder = await connection
            .createQueryBuilder()
            .comment(comment);
        const clonedQueryBuilder = queryBuilder.clone();
        (0, chai_1.expect)(clonedQueryBuilder.expressionMap.comment).to.be.eq(comment);
    })));
});
//# sourceMappingURL=issue-7203.js.map