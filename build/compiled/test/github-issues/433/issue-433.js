"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("github issues > #433 default value (json) is not getting set in postgreSQL", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should successfully set default value in to JSON type column", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.id = 1;
        await connection.getRepository(Post_1.Post).save(post);
        const loadedPost = (await connection
            .getRepository(Post_1.Post)
            .findOneBy({ id: 1 }));
        loadedPost.json.should.be.eql({ hello: "world" });
    })));
});
//# sourceMappingURL=issue-433.js.map