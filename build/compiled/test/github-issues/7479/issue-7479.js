"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #7479 Only first single quote in comments is escaped", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres", "cockroachdb", "mysql"],
        schemaCreate: true,
        dropSchema: true,
        entities: [Post_1.Post],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should properly escape quotes in comments", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        const column1 = table.findColumnByName("text");
        const column2 = table.findColumnByName("text2");
        const column3 = table.findColumnByName("text3");
        column1.comment.should.be.equal(`E.g. 'foo', 'bar', or 'baz' etc.`);
        column2.comment.should.be.equal(`E.g. '''foo, 'bar''', or baz' etc.`);
        column3.comment.should.be.equal(`E.g. "foo", "bar", or "baz" etc.`);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-7479.js.map