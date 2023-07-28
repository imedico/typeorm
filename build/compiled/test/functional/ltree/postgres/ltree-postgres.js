"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("ltree-postgres", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create correct schema with Postgres' ltree type", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const schema = await queryRunner.getTable("post");
        await queryRunner.release();
        (0, chai_1.expect)(schema).not.to.be.undefined;
        const ltreeColumn = schema.columns.find((tableColumn) => tableColumn.name === "path" &&
            tableColumn.type === "ltree" &&
            !tableColumn.isArray);
        (0, chai_1.expect)(ltreeColumn).to.not.be.undefined;
    })));
    it("should persist ltree correctly", () => Promise.all(connections.map(async (connection) => {
        const path = "News.Featured.Opinion";
        const postRepo = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.path = path;
        const persistedPost = await postRepo.save(post);
        const foundPost = await postRepo.findOneBy({
            id: persistedPost.id,
        });
        (0, chai_1.expect)(foundPost).to.exist;
        (0, chai_1.expect)(foundPost.path).to.deep.equal(path);
    })));
    it("should update ltree correctly", () => Promise.all(connections.map(async (connection) => {
        const path = "News.Featured.Opinion";
        const path2 = "News.Featured.Gossip";
        const postRepo = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.path = path;
        const persistedPost = await postRepo.save(post);
        await postRepo.update({ id: persistedPost.id }, { path: path2 });
        const foundPost = await postRepo.findOneBy({
            id: persistedPost.id,
        });
        (0, chai_1.expect)(foundPost).to.exist;
        (0, chai_1.expect)(foundPost.path).to.deep.equal(path2);
    })));
    it("should re-save ltree correctly", () => Promise.all(connections.map(async (connection) => {
        const path = "News.Featured.Opinion";
        const path2 = "News.Featured.Gossip";
        const postRepo = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.path = path;
        const persistedPost = await postRepo.save(post);
        persistedPost.path = path2;
        await postRepo.save(persistedPost);
        const foundPost = await postRepo.findOneBy({
            id: persistedPost.id,
        });
        (0, chai_1.expect)(foundPost).to.exist;
        (0, chai_1.expect)(foundPost.path).to.deep.equal(path2);
    })));
    it("should persist ltree correctly with trailing '.'", () => Promise.all(connections.map(async (connection) => {
        const path = "News.Featured.Opinion.";
        const postRepo = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.path = path;
        const persistedPost = await postRepo.save(post);
        const foundPost = await postRepo.findOneBy({
            id: persistedPost.id,
        });
        (0, chai_1.expect)(foundPost).to.exist;
        (0, chai_1.expect)(foundPost.path).to.deep.equal("News.Featured.Opinion");
    })));
    it("should persist ltree correctly when containing spaces", () => Promise.all(connections.map(async (connection) => {
        const path = "News.Featured Story.Opinion";
        const postRepo = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.path = path;
        const persistedPost = await postRepo.save(post);
        const foundPost = await postRepo.findOneBy({
            id: persistedPost.id,
        });
        (0, chai_1.expect)(foundPost).to.exist;
        (0, chai_1.expect)(foundPost.path).to.deep.equal("News.Featured_Story.Opinion");
    })));
    it("should be able to query ltree correctly", () => Promise.all(connections.map(async (connection) => {
        const path = "News.Featured.Opinion";
        const postRepo = connection.getRepository(Post_1.Post);
        const post = new Post_1.Post();
        post.path = path;
        await postRepo.save(post);
        const foundPost = await postRepo
            .createQueryBuilder()
            .where(`path ~ 'news@.*'`)
            .getOne();
        (0, chai_1.expect)(foundPost).to.exist;
        (0, chai_1.expect)(foundPost.path).to.deep.equal(path);
    })));
});
//# sourceMappingURL=ltree-postgres.js.map