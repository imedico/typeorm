"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #3636 synchronize drops (and then re-adds) json column in mariadb", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        enabledDrivers: ["mariadb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not drop json column", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.id = 1;
        post.data = { hello: "world" };
        await connection.manager.save(post);
        await connection.synchronize();
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        (0, chai_1.expect)(loadedPost).to.be.not.empty;
        (0, chai_1.expect)(loadedPost.data.hello).to.be.eq("world");
    })));
});
//# sourceMappingURL=issue-3636.js.map