"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Author_1 = require("./entity/Author");
const Post_1 = require("./entity/Post");
describe("github issues > #1123 load relation eagerly by setting isEager property", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [
            new src_1.EntitySchema(Author_1.AuthorSchema),
            new src_1.EntitySchema(Post_1.PostSchema),
        ],
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    async function prepareData(connection) {
        const author = new Author_1.Author();
        author.id = 1;
        author.name = "Jane Doe";
        await connection.manager.save(author);
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Post 1";
        post.author = author;
        await connection.manager.save(post);
    }
    it("should load all eager relations when object is loaded", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const loadedPost = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        loadedPost.should.be.eql({
            id: 1,
            title: "Post 1",
            author: {
                id: 1,
                name: "Jane Doe",
            },
        });
    })));
    it("should not load eager relations when query builder is used", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const loadedPost = (await connection.manager
            .createQueryBuilder("Post", "post")
            .where("post.id = :id", { id: 1 })
            .getOne());
        loadedPost.should.be.eql({
            id: 1,
            title: "Post 1",
        });
    })));
});
//# sourceMappingURL=issue-1123.js.map