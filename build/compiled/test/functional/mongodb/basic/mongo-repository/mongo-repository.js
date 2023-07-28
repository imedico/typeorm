"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const MongoRepository_1 = require("../../../../../src/repository/MongoRepository");
describe("mongodb > MongoRepository", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post, Post_1.PostWithDeleted],
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("connection should return mongo repository when requested", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        (0, chai_1.expect)(postRepository).to.be.instanceOf(MongoRepository_1.MongoRepository);
    })));
    it("entity manager should return mongo repository when requested", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.manager.getMongoRepository(Post_1.Post);
        (0, chai_1.expect)(postRepository).to.be.instanceOf(MongoRepository_1.MongoRepository);
    })));
    it("should be able to use entity cursor which will return instances of entity classes", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save few posts
        const firstPost = new Post_1.Post();
        firstPost.title = "Post #1";
        firstPost.text = "Everything about post #1";
        await postRepository.save(firstPost);
        const secondPost = new Post_1.Post();
        secondPost.title = "Post #2";
        secondPost.text = "Everything about post #2";
        await postRepository.save(secondPost);
        const cursor = postRepository.createEntityCursor({
            title: "Post #1",
        });
        const loadedPosts = await cursor.toArray();
        (0, chai_1.expect)(loadedPosts).to.have.length(1);
        (0, chai_1.expect)(loadedPosts[0]).to.be.instanceOf(Post_1.Post);
        (0, chai_1.expect)(loadedPosts[0].id).to.eql(firstPost.id);
        (0, chai_1.expect)(loadedPosts[0].title).to.eql("Post #1");
        (0, chai_1.expect)(loadedPosts[0].text).to.eql("Everything about post #1");
    })));
    it("should be able to use entity cursor which will return instances of entity classes", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save few posts
        const firstPost = new Post_1.Post();
        firstPost.title = "Post #1";
        firstPost.text = "Everything about post #1";
        await postRepository.save(firstPost);
        const secondPost = new Post_1.Post();
        secondPost.title = "Post #2";
        secondPost.text = "Everything about post #2";
        await postRepository.save(secondPost);
        const loadedPosts = await postRepository.find({
            where: {
                $or: [
                    {
                        title: "Post #1",
                    },
                    {
                        text: "Everything about post #1",
                    },
                ],
            },
        });
        (0, chai_1.expect)(loadedPosts).to.have.length(1);
        (0, chai_1.expect)(loadedPosts[0]).to.be.instanceOf(Post_1.Post);
        (0, chai_1.expect)(loadedPosts[0].id).to.eql(firstPost.id);
        (0, chai_1.expect)(loadedPosts[0].title).to.eql("Post #1");
        (0, chai_1.expect)(loadedPosts[0].text).to.eql("Everything about post #1");
    })));
    it("should be able to use findByIds with both ObjectId and strings", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save few posts
        const firstPost = new Post_1.Post();
        firstPost.title = "Post #1";
        firstPost.text = "Everything about post #1";
        await postRepository.save(firstPost);
        const secondPost = new Post_1.Post();
        secondPost.title = "Post #2";
        secondPost.text = "Everything about post #2";
        await postRepository.save(secondPost);
        (0, chai_1.expect)(await postRepository.findByIds([firstPost.id])).to.have.length(1);
        (0, chai_1.expect)(await postRepository.findByIds([
            firstPost.id.toHexString(),
        ])).to.have.length(1);
        (0, chai_1.expect)(await postRepository.findByIds([{ id: firstPost.id }])).to.have.length(1);
        (0, chai_1.expect)(await postRepository.findByIds([undefined])).to.have.length(0);
    })));
    // todo: cover other methods as well
    it("should be able to save and update mongo entities", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getMongoRepository(Post_1.Post);
        // save few posts
        const firstPost = new Post_1.Post();
        firstPost.title = "Post #1";
        firstPost.text = "Everything about post #1";
        await postRepository.save(firstPost);
        const secondPost = new Post_1.Post();
        secondPost.title = "Post #2";
        secondPost.text = "Everything about post #2";
        await postRepository.save(secondPost);
        // save few posts
        firstPost.text = "Everything and more about post #1";
        await postRepository.save(firstPost);
        const loadedPosts = await postRepository.find();
        (0, chai_1.expect)(loadedPosts).to.have.length(2);
        (0, chai_1.expect)(loadedPosts[0].text).to.eql("Everything and more about post #1");
        (0, chai_1.expect)(loadedPosts[1].text).to.eql("Everything about post #2");
    })));
    it("should ignore non-column properties", () => Promise.all(connections.map(async (connection) => {
        // Github issue #5321
        const postRepository = connection.getMongoRepository(Post_1.Post);
        await postRepository.save({
            title: "Hello",
            text: "World",
            unreal: "Not a Column",
        });
        const loadedPosts = await postRepository.find();
        (0, chai_1.expect)(loadedPosts).to.have.length(1);
        (0, chai_1.expect)(loadedPosts[0]).to.not.have.property("unreal");
    })));
    // Github issue #9250
    describe("with DeletedDataColumn", () => {
        it("with $or query", () => Promise.all(connections.map(async (connection) => {
            const postRepository = connection.getMongoRepository(Post_1.PostWithDeleted);
            await seedPosts(postRepository);
            const loadedPosts = await postRepository.find({
                where: {
                    $or: [{ deletedAt: { $ne: null } }],
                },
            });
            (0, chai_1.expect)(loadedPosts).to.have.length(3);
        })));
        it("filter delete data", () => Promise.all(connections.map(async (connection) => {
            const postRepository = connection.getMongoRepository(Post_1.PostWithDeleted);
            await seedPosts(postRepository);
            const loadedPosts = await postRepository.find();
            const filteredPost = loadedPosts.find((post) => post.title === "deleted");
            (0, chai_1.expect)(filteredPost).to.be.undefined;
            (0, chai_1.expect)(loadedPosts).to.have.length(2);
        })));
        describe("findOne filtered data properly", () => {
            it("findOne()", () => Promise.all(connections.map(async (connection) => {
                const postRepository = connection.getMongoRepository(Post_1.PostWithDeleted);
                await seedPosts(postRepository);
                const loadedPost = await postRepository.findOne({
                    where: { title: "notDeleted" },
                });
                const loadedPostWithDeleted = await postRepository.findOne({
                    where: { title: "deleted" },
                    withDeleted: true,
                });
                (0, chai_1.expect)(loadedPost === null || loadedPost === void 0 ? void 0 : loadedPost.title).to.eql("notDeleted");
                (0, chai_1.expect)(loadedPostWithDeleted === null || loadedPostWithDeleted === void 0 ? void 0 : loadedPostWithDeleted.title).to.eql("deleted");
            })));
            it("findOneBy()", () => Promise.all(connections.map(async (connection) => {
                const postRepository = connection.getMongoRepository(Post_1.PostWithDeleted);
                await seedPosts(postRepository);
                const loadedPost = await postRepository.findOneBy({
                    where: { title: "notDeleted" },
                });
                const loadedPostWithDeleted = await postRepository.findOne({
                    where: { title: "deleted" },
                    withDeleted: true,
                });
                (0, chai_1.expect)(loadedPost === null || loadedPost === void 0 ? void 0 : loadedPost.title).to.eql("notDeleted");
                (0, chai_1.expect)(loadedPostWithDeleted === null || loadedPostWithDeleted === void 0 ? void 0 : loadedPostWithDeleted.title).to.eql("deleted");
            })));
        });
    });
});
async function seedPosts(postRepository) {
    await postRepository.save({
        title: "withoutDeleted",
        text: "withoutDeleted",
    });
    await postRepository.save({
        title: "notDeleted",
        text: "notDeleted",
        deletedAt: null,
    });
    await postRepository.save({
        title: "deleted",
        text: "deleted",
        deletedAt: new Date(),
    });
}
//# sourceMappingURL=mongo-repository.js.map