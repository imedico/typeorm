"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("entity-listeners", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        dropSchema: true,
        schemaCreate: true,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("beforeUpdate", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.title = "post title";
        post.text = "post text";
        await connection.manager.save(post);
        let loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOneBy({ id: post.id });
        loadedPost.title = "post title   ";
        await connection.manager.save(loadedPost);
        loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOneBy({ id: post.id });
        loadedPost.title.should.be.equal("post title");
    })));
});
//# sourceMappingURL=entity-listeners.js.map