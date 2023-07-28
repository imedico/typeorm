"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #512 Table name escaping in UPDATE in QueryBuilder", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should escape table name using driver's escape function in UPDATE", () => Promise.all(connections.map(async (connection) => {
        const driver = connection.driver;
        const queryBuilder = connection.manager.createQueryBuilder(Post_1.Post, "post");
        const query = queryBuilder
            .update({
            title: "Some Title",
        })
            .getSql();
        return query.should.deep.include(driver.escape("Posts"));
    })));
});
//# sourceMappingURL=issue-512.js.map