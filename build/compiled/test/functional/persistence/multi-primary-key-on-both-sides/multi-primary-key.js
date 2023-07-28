"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("persistence > multi primary keys on both sides", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("insert", function () {
        it("should insert entity when there are multi column primary keys", () => Promise.all(connections.map(async (connection) => {
            const post1 = new Post_1.Post();
            post1.title = "Hello Post #1";
            post1.firstId = 1;
            post1.secondId = 2;
            await connection.manager.save(post1);
            // create first category and post and save them
            const category1 = new Category_1.Category();
            category1.categoryId = 123;
            category1.name = "Category saved by cascades #1";
            category1.posts = [post1];
            await connection.manager.save(category1);
            // now check
            const posts = await connection.manager.find(Post_1.Post, {
                join: {
                    alias: "post",
                    innerJoinAndSelect: {
                        category: "post.category",
                    },
                },
                order: {
                    firstId: "ASC",
                },
            });
            posts.should.be.eql([
                {
                    firstId: 1,
                    secondId: 2,
                    title: "Hello Post #1",
                    category: {
                        categoryId: 123,
                        name: "Category saved by cascades #1",
                    },
                },
            ]);
        })));
    });
});
//# sourceMappingURL=multi-primary-key.js.map