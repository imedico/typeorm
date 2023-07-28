"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const src_1 = require("../../../src");
describe("github issues > #219 FindOptions should be able to resolve null values", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should properly query null values", () => Promise.all(connections.map(async (connection) => {
        for (let i = 1; i <= 10; i++) {
            const post1 = new Post_1.Post();
            post1.title = "post #" + i;
            post1.text = i > 5 ? "about post" : null;
            await connection.manager.save(post1);
        }
        const postsWithoutText1 = await connection.manager.find(Post_1.Post, {
            where: {
                text: (0, src_1.IsNull)(),
            },
        });
        postsWithoutText1.length.should.be.equal(5);
        const postsWithText1 = await connection.manager.find(Post_1.Post, {
            where: { text: "about post" },
        });
        postsWithText1.length.should.be.equal(5);
    })));
});
//# sourceMappingURL=issue-219.js.map