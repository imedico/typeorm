"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe(`query builder > find with the global condition of "non-deleted"`, () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it(`The global condition of "non-deleted" should be set for the entity with delete date columns`, () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.title = "title#1";
        const post2 = new Post_1.Post();
        post2.title = "title#2";
        const post3 = new Post_1.Post();
        post3.title = "title#3";
        await connection.manager.save(post1);
        await connection.manager.save(post2);
        await connection.manager.save(post3);
        await connection.manager.softRemove(post1);
        const loadedPosts = await connection
            .createQueryBuilder()
            .select("post")
            .from(Post_1.Post, "post")
            .orderBy("post.id")
            .getMany();
        loadedPosts.length.should.be.equal(2);
        loadedPosts[0].title.should.be.equals("title#2");
        loadedPosts[1].title.should.be.equals("title#3");
        const loadedPost = await connection
            .createQueryBuilder()
            .select("post")
            .from(Post_1.Post, "post")
            .orderBy("post.id")
            .getOne();
        loadedPost.title.should.be.equals("title#2");
    })));
    it(`The global condition of "non-deleted" should not be set when "withDeleted" is called`, () => Promise.all(connections.map(async (connection) => {
        const post1 = new Post_1.Post();
        post1.title = "title#1";
        const post2 = new Post_1.Post();
        post2.title = "title#2";
        const post3 = new Post_1.Post();
        post3.title = "title#3";
        await connection.manager.save(post1);
        await connection.manager.save(post2);
        await connection.manager.save(post3);
        await connection.manager.softRemove(post1);
        const loadedPosts = await connection
            .createQueryBuilder()
            .select("post")
            .from(Post_1.Post, "post")
            .withDeleted()
            .orderBy("post.id")
            .getMany();
        loadedPosts.length.should.be.equal(3);
        loadedPosts[0].title.should.be.equals("title#1");
        loadedPosts[1].title.should.be.equals("title#2");
        loadedPosts[2].title.should.be.equals("title#3");
        const loadedPost = await connection
            .createQueryBuilder()
            .select("post")
            .from(Post_1.Post, "post")
            .withDeleted()
            .orderBy("post.id")
            .getOne();
        loadedPost.title.should.be.equals("title#1");
    })));
});
//# sourceMappingURL=query-builder-global-condition-non-deleted.js.map