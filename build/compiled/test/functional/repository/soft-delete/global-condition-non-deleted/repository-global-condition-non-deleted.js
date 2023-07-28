"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe(`repository > the global condtion of "non-deleted"`, () => {
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
        const loadedPosts = await connection.getRepository(Post_1.Post).find();
        loadedPosts.length.should.be.equal(2);
        const loadedPost2 = loadedPosts.find((p) => p.id === 2);
        (0, chai_1.expect)(loadedPost2).to.exist;
        (0, chai_1.expect)(loadedPost2.deletedAt).to.equals(null);
        (0, chai_1.expect)(loadedPost2.title).to.equals("title#2");
        const loadedPost3 = loadedPosts.find((p) => p.id === 3);
        (0, chai_1.expect)(loadedPost3).to.exist;
        (0, chai_1.expect)(loadedPost3.deletedAt).to.equals(null);
        (0, chai_1.expect)(loadedPost3.title).to.equals("title#3");
    })));
    it(`The global condition of "non-deleted" should not be set when the option "withDeleted" is set to true`, () => Promise.all(connections.map(async (connection) => {
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
        const loadedPosts = await connection.getRepository(Post_1.Post).find({
            withDeleted: true,
        });
        loadedPosts.length.should.be.equal(3);
        const loadedPost1 = loadedPosts.find((p) => p.id === 1);
        (0, chai_1.expect)(loadedPost1).to.exist;
        (0, chai_1.expect)(loadedPost1.deletedAt).to.be.instanceof(Date);
        (0, chai_1.expect)(loadedPost1.title).to.equals("title#1");
        const loadedPost2 = loadedPosts.find((p) => p.id === 2);
        (0, chai_1.expect)(loadedPost2).to.exist;
        (0, chai_1.expect)(loadedPost2.deletedAt).to.equals(null);
        (0, chai_1.expect)(loadedPost2.title).to.equals("title#2");
        const loadedPost3 = loadedPosts.find((p) => p.id === 3);
        (0, chai_1.expect)(loadedPost3).to.exist;
        (0, chai_1.expect)(loadedPost3.deletedAt).to.equals(null);
        (0, chai_1.expect)(loadedPost3.title).to.equals("title#3");
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            withDeleted: true,
        });
        (0, chai_1.expect)(loadedPost).to.exist;
        (0, chai_1.expect)(loadedPost.title).to.equals("title#1");
    })));
});
//# sourceMappingURL=repository-global-condition-non-deleted.js.map