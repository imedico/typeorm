"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("persistence > cascade operations with custom name", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("cascade update", function () {
        it("should remove relation", () => Promise.all(connections.map(async (connection) => {
            // create first post and category and save them
            const post1 = new Post_1.Post();
            post1.title = "Hello Post #1";
            const category1 = new Category_1.Category();
            category1.name = "Category saved by cascades #1";
            category1.posts = [post1];
            await connection.manager.save(category1);
            category1.posts = [];
            await connection.manager.save(category1);
            // now check
            const posts = await connection.manager.find(Post_1.Post, {
                join: {
                    alias: "post",
                    leftJoinAndSelect: {
                        category: "post.category",
                    },
                },
                order: {
                    id: "ASC",
                },
            });
            posts.should.be.eql([
                {
                    id: 1,
                    title: "Hello Post #1",
                    category: null,
                },
            ]);
        })));
    });
});
//# sourceMappingURL=custom-column-name-pk.js.map