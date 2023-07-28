"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("github issues > #703.findOne does not return an empty array on OneToMany relationship", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not return anything in joined relation if nothing was found", () => Promise.all(connections.map(async (connection) => {
        const category = new Category_1.Category();
        category.firstId = 1;
        category.secondId = 2;
        category.name = "category about posts";
        await connection.manager.save(category);
        const post = new Post_1.Post();
        post.title = "new post";
        post.categories = [];
        await connection.manager.save(post);
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: { categories: true },
        });
        loadedPost.id.should.be.equal(1);
        loadedPost.title.should.be.equal("new post");
        loadedPost.categories.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=issue-703.js.map