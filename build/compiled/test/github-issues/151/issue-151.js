"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("github issues > #151 joinAndSelect can't find entity from inverse side of relation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should cascade persist successfully", () => Promise.all(connections.map(async (connection) => {
        const category = new Category_1.Category();
        category.name = "post category";
        const post = new Post_1.Post();
        post.title = "Hello post";
        post.category = category;
        await connection.manager.save(post);
        const loadedPost = await connection.manager.findOne(Post_1.Post, {
            where: {
                id: 1,
            },
            join: {
                alias: "post",
                innerJoinAndSelect: {
                    category: "post.category",
                },
            },
        });
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.should.be.eql({
            id: 1,
            title: "Hello post",
            category: {
                id: 1,
                name: "post category",
            },
        });
    })));
});
//# sourceMappingURL=issue-151.js.map