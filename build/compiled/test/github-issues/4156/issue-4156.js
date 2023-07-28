"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Author_1 = require("./entity/Author");
const Post_1 = require("./entity/Post");
describe("github issues > #4156 QueryExpressionMap doesn't clone all values correctly", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [
            new src_1.EntitySchema(Author_1.AuthorSchema),
            new src_1.EntitySchema(Post_1.PostSchema),
        ],
        dropSchema: true,
        enabledDrivers: ["postgres"],
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
    it("should not error when the query builder has been cloned", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const qb = connection.manager.createQueryBuilder("Post", "post");
        const [loadedPost1, loadedPost2] = (await Promise.all([
            qb.clone().where({ id: 1 }).getOne(),
            qb
                .clone()
                .where({ id: (0, src_1.In)([1]) })
                .getOne(),
        ]));
        loadedPost1.should.be.eql({
            id: 1,
            title: "Post 1",
        });
        loadedPost2.should.be.eql({
            id: 1,
            title: "Post 1",
        });
    })));
    it("should not error when the query builder with where statement has been cloned", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const qb = connection.manager
            .createQueryBuilder("Post", "post")
            .where({ id: 1 });
        const [loadedPost1, loadedPost2] = (await Promise.all([
            qb.clone().getOne(),
            qb.clone().getOne(),
        ]));
        loadedPost1.should.be.eql({
            id: 1,
            title: "Post 1",
        });
        loadedPost2.should.be.eql({
            id: 1,
            title: "Post 1",
        });
    })));
});
//# sourceMappingURL=issue-4156.js.map