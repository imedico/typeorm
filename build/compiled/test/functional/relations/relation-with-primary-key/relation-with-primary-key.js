"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("relations > relation with primary key", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("many-to-one with primary key in relation", function () {
        it("should work perfectly", () => Promise.all(connections.map(async (connection) => {
            // create first category and post and save them
            const category1 = new Category_1.Category();
            category1.name = "Category saved by cascades #1";
            const post1 = new Post_1.Post();
            post1.title = "Hello Post #1";
            post1.category = category1;
            await connection.manager.save(post1);
            // create second category and post and save them
            const category2 = new Category_1.Category();
            category2.name = "Category saved by cascades #2";
            const post2 = new Post_1.Post();
            post2.title = "Hello Post #2";
            post2.category = category2;
            await connection.manager.save(post2);
            // now check
            const posts = await connection.manager.find(Post_1.Post, {
                join: {
                    alias: "post",
                    innerJoinAndSelect: {
                        category: "post.category",
                    },
                },
                order: {
                    categoryId: "ASC",
                },
            });
            posts.should.be.eql([
                {
                    title: "Hello Post #1",
                    categoryId: 1,
                    category: {
                        id: 1,
                        name: "Category saved by cascades #1",
                    },
                },
                {
                    title: "Hello Post #2",
                    categoryId: 2,
                    category: {
                        id: 2,
                        name: "Category saved by cascades #2",
                    },
                },
            ]);
        })));
    });
});
//# sourceMappingURL=relation-with-primary-key.js.map