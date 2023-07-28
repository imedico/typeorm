"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #1839 Charset and collation not being carried to JoinTable when generating migration", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should carry charset and collation from original column in to junction column", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post_categories_category");
        table
            .findColumnByName("postId")
            .charset.should.be.equal("utf8");
        table
            .findColumnByName("postId")
            .collation.should.be.equal("utf8_unicode_ci");
        table
            .findColumnByName("categoryId")
            .charset.should.be.equal("ascii");
        table
            .findColumnByName("categoryId")
            .collation.should.be.equal("ascii_general_ci");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-1839.js.map