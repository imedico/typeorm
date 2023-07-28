"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const PostCategory_1 = require("./entity/PostCategory");
const chai_1 = require("chai");
describe("github issues > #58 relations with multiple primary keys", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully and return persisted entity", () => Promise.all(connections.map(async (connection) => {
        // create objects to save
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        const post = new Post_1.Post();
        post.title = "Hello Post #1";
        const postCategory1 = new PostCategory_1.PostCategory();
        postCategory1.addedByAdmin = true;
        postCategory1.addedByUser = false;
        postCategory1.category = category1;
        postCategory1.post = post;
        const postCategory2 = new PostCategory_1.PostCategory();
        postCategory2.addedByAdmin = false;
        postCategory2.addedByUser = true;
        postCategory2.category = category2;
        postCategory2.post = post;
        await connection.manager.save(postCategory1);
        await connection.manager.save(postCategory2);
        // check that all persisted objects exist
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .innerJoinAndSelect("post.categories", "postCategory")
            .innerJoinAndSelect("postCategory.category", "category")
            .addOrderBy("postCategory.categoryId")
            .getOne();
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.should.be.eql({
            id: 1,
            title: "Hello Post #1",
            categories: [
                {
                    categoryId: 1,
                    postId: 1,
                    addedByAdmin: true,
                    addedByUser: false,
                    category: {
                        id: 1,
                        name: "category #1",
                    },
                },
                {
                    categoryId: 2,
                    postId: 1,
                    addedByAdmin: false,
                    addedByUser: true,
                    category: {
                        id: 2,
                        name: "category #2",
                    },
                },
            ],
        });
    })));
});
//# sourceMappingURL=issue-58.js.map