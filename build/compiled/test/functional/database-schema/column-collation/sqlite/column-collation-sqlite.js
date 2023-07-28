"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../../../utils/test-utils");
// skipped because there is no way to get column collation from SQLite table schema
describe.skip("database schema > column collation > sqlite", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["sqlite", "better-sqlite3"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create column with collation option", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        await queryRunner.release();
        const post = new Post_1.Post();
        post.id = 1;
        post.name = "Post";
        await postRepository.save(post);
        table
            .findColumnByName("name")
            .collation.should.be.equal("RTRIM");
    })));
});
//# sourceMappingURL=column-collation-sqlite.js.map