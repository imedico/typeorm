"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const src_1 = require("../../../../src");
const Post_1 = require("./entity/Post");
const PostBigInt_1 = require("./entity/PostBigInt");
const UserWithEmbededEntity_1 = require("./entity/UserWithEmbededEntity");
describe("repository > decrement method", () => {
    describe("basic", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Post_1.Post],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should decrement value", () => Promise.all(connections.map(async (connection) => {
            // save few dummy posts
            const post1 = new Post_1.Post();
            post1.id = 1;
            post1.title = "post #1";
            post1.counter = 2;
            const post2 = new Post_1.Post();
            post2.id = 2;
            post2.title = "post #2";
            post2.counter = 5;
            await connection.manager.save([post1, post2]);
            // decrement counter of post 1
            await connection
                .getRepository(Post_1.Post)
                .decrement({ id: 1 }, "counter", 1);
            // decrement counter of post 2
            await connection.manager.decrement(Post_1.Post, { id: 2 }, "counter", 3);
            // load and check counter
            const loadedPost1 = await connection.manager.findOne(Post_1.Post, {
                where: {
                    id: 1,
                },
            });
            loadedPost1.counter.should.be.equal(1);
            const loadedPost2 = await connection.manager.findOne(Post_1.Post, {
                where: {
                    id: 2,
                },
            });
            loadedPost2.counter.should.be.equal(2);
        })));
        it("should accept string as input and decrement value", () => Promise.all(connections.map(async (connection) => {
            // save few dummy posts
            const post1 = new Post_1.Post();
            post1.id = 1;
            post1.title = "post #1";
            post1.counter = 23;
            const post2 = new Post_1.Post();
            post2.id = 2;
            post2.title = "post #2";
            post2.counter = 35;
            await connection.manager.save([post1, post2]);
            // decrement counter of post 1
            await connection
                .getRepository(Post_1.Post)
                .decrement({ id: 1 }, "counter", "22");
            // decrement counter of post 2
            await connection.manager.decrement(Post_1.Post, { id: 2 }, "counter", "33");
            // load and check counter
            const loadedPost1 = await connection.manager.findOne(Post_1.Post, {
                where: {
                    id: 1,
                },
            });
            loadedPost1.counter.should.be.equal(1);
            const loadedPost2 = await connection.manager.findOne(Post_1.Post, {
                where: {
                    id: 2,
                },
            });
            loadedPost2.counter.should.be.equal(2);
        })));
        it("should return UpdateResult", () => Promise.all(connections.map(async (connection) => {
            // save few dummy posts
            const post1 = new Post_1.Post();
            post1.id = 1;
            post1.title = "post #1";
            post1.counter = 50;
            await connection.manager.save(post1);
            // increment counter of post 1
            const result = await connection
                .getRepository(Post_1.Post)
                .decrement({ id: 1 }, "counter", 22);
            result.should.be.an.instanceOf(src_1.UpdateResult);
        })));
        it("should throw an error if column property path was not found", () => Promise.all(connections.map(async (connection) => {
            // save few dummy posts
            const post1 = new Post_1.Post();
            post1.id = 1;
            post1.title = "post #1";
            post1.counter = 1;
            const post2 = new Post_1.Post();
            post2.id = 2;
            post2.title = "post #2";
            post2.counter = 1;
            await connection.manager.save([post1, post2]);
            // decrement counter of post 1
            await connection
                .getRepository(Post_1.Post)
                .decrement({ id: 1 }, "unknownProperty", 1).should.be
                .rejected;
        })));
        it("should throw an error if input value is not number", () => Promise.all(connections.map(async (connection) => {
            // save few dummy posts
            const post1 = new Post_1.Post();
            post1.id = 1;
            post1.title = "post #1";
            post1.counter = 1;
            const post2 = new Post_1.Post();
            post2.id = 2;
            post2.title = "post #2";
            post2.counter = 1;
            await connection.manager.save([post1, post2]);
            // decrement counter of post 1
            await connection
                .getRepository(Post_1.Post)
                .decrement({ id: 1 }, "counter", "12abc").should.be
                .rejected;
        })));
    });
    describe("bigint", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [PostBigInt_1.PostBigInt],
            enabledDrivers: ["mysql", "mariadb", "postgres"],
            // logging: true
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should decrement value", () => Promise.all(connections.map(async (connection) => {
            // save few dummy posts
            const postBigInt1 = new PostBigInt_1.PostBigInt();
            postBigInt1.id = 1;
            postBigInt1.title = "post #1";
            postBigInt1.counter = "9000000000000000001";
            const postBigInt2 = new PostBigInt_1.PostBigInt();
            postBigInt2.id = 2;
            postBigInt2.title = "post #2";
            postBigInt2.counter = "9000000000000000002";
            await connection.manager.save([postBigInt1, postBigInt2]);
            // decrement counter of post 1
            await connection
                .getRepository(PostBigInt_1.PostBigInt)
                .decrement({ id: 1 }, "counter", "9000000000000000000");
            // decrement counter of post 2
            await connection.manager.decrement(PostBigInt_1.PostBigInt, { id: 2 }, "counter", "9000000000000000000");
            // load and check counter
            const loadedPost1 = await connection.manager.findOne(PostBigInt_1.PostBigInt, {
                where: {
                    id: 1,
                },
            });
            loadedPost1.counter.should.be.equal("1");
            const loadedPost2 = await connection.manager.findOne(PostBigInt_1.PostBigInt, {
                where: {
                    id: 2,
                },
            });
            loadedPost2.counter.should.be.equal("2");
        })));
    });
    describe("embeded entities", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [UserWithEmbededEntity_1.UserWithEmbededEntity],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should decrement value", () => Promise.all(connections.map(async (connection) => {
            const userWithEmbededEntity = new UserWithEmbededEntity_1.UserWithEmbededEntity();
            userWithEmbededEntity.id = 1;
            await connection.manager.save([userWithEmbededEntity]);
            await connection
                .getRepository(UserWithEmbededEntity_1.UserWithEmbededEntity)
                .decrement({ id: 1 }, "friend.sent", 15);
            const loadedUser = await connection.manager.findOne(UserWithEmbededEntity_1.UserWithEmbededEntity, {
                where: {
                    id: 1,
                },
            });
            loadedUser.friend.sent.should.be.equal(-15);
        })));
    });
});
//# sourceMappingURL=repository-decrement.js.map