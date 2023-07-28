"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("query builder > enabling transaction", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({ __dirname })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should execute query in a transaction", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "about transactions in query builder";
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(post)
            .useTransaction(true)
            .execute();
        // todo: check if transaction query was executed
    })));
    // todo: add tests for update and remove queries as well
});
//# sourceMappingURL=enabling-transaction.js.map