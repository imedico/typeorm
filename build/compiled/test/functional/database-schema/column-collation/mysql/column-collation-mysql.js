"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../../../utils/test-utils");
describe("database schema > column collation > mysql", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
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
        post.title = "Post #1";
        post.description = "This is post";
        await postRepository.save(post);
        table
            .findColumnByName("name")
            .charset.should.be.equal("ascii");
        table
            .findColumnByName("name")
            .collation.should.be.equal("ascii_general_ci");
        table
            .findColumnByName("title")
            .charset.should.be.equal("utf8");
        table
            .findColumnByName("title")
            .collation.should.be.equal("utf8_general_ci");
        table
            .findColumnByName("description")
            .charset.should.be.equal("cp852");
        table
            .findColumnByName("description")
            .collation.should.be.equal("cp852_general_ci");
    })));
});
//# sourceMappingURL=column-collation-mysql.js.map