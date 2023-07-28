"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #4842 QueryExpressionMap doesn't clone distinct property", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should contain correct distinct value after query builder is cloned", () => Promise.all(connections.map(async (connection) => {
        const query = connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .distinct()
            .disableEscaping();
        const sqlWithDistinct = query.getSql();
        (0, chai_1.expect)(query.clone().getSql()).to.equal(sqlWithDistinct);
    })));
});
//# sourceMappingURL=issue-4842.js.map