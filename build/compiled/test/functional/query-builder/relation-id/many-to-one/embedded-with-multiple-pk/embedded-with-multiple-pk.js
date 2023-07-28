"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const Counters_1 = require("./entity/Counters");
const User_1 = require("./entity/User");
const Subcounters_1 = require("./entity/Subcounters");
describe("query builder > relation-id > many-to-one > embedded-with-multiple-pk", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load ids when loadRelationIdAndMap used on embedded table and each table have primary key", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.id = 1;
        user1.name = "Alice";
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.id = 2;
        user2.name = "Bob";
        await connection.manager.save(user2);
        const category1 = new Category_1.Category();
        category1.id = 1;
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.id = 2;
        category2.name = "airplanes";
        await connection.manager.save(category2);
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.title = "About BMW";
        post1.counters = new Counters_1.Counters();
        post1.counters.code = 111;
        post1.counters.likes = 1;
        post1.counters.comments = 2;
        post1.counters.favorites = 3;
        post1.counters.category = category1;
        post1.counters.subcounters = new Subcounters_1.Subcounters();
        post1.counters.subcounters.version = 1;
        post1.counters.subcounters.watches = 2;
        post1.counters.subcounters.watchedUser = user1;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.id = 2;
        post2.title = "About Boeing";
        post2.counters = new Counters_1.Counters();
        post2.counters.code = 222;
        post2.counters.likes = 3;
        post2.counters.comments = 4;
        post2.counters.favorites = 5;
        post2.counters.category = category2;
        post2.counters.subcounters = new Subcounters_1.Subcounters();
        post2.counters.subcounters.version = 1;
        post2.counters.subcounters.watches = 1;
        post2.counters.subcounters.watchedUser = user2;
        await connection.manager.save(post2);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.counters.categoryId", "post.counters.category")
            .loadRelationIdAndMap("post.counters.subcounters.watchedUserId", "post.counters.subcounters.watchedUser")
            .orderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].should.be.eql({
            id: 1,
            title: "About BMW",
            counters: {
                code: 111,
                likes: 1,
                comments: 2,
                favorites: 3,
                categoryId: { id: 1, name: "cars" },
                subcounters: {
                    version: 1,
                    watches: 2,
                    watchedUserId: { id: 1, name: "Alice" },
                },
            },
        }));
        (0, chai_1.expect)(loadedPosts[1].should.be.eql({
            id: 2,
            title: "About Boeing",
            counters: {
                code: 222,
                likes: 3,
                comments: 4,
                favorites: 5,
                categoryId: { id: 2, name: "airplanes" },
                subcounters: {
                    version: 1,
                    watches: 1,
                    watchedUserId: { id: 2, name: "Bob" },
                },
            },
        }));
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.counters.categoryId", "post.counters.category")
            .loadRelationIdAndMap("post.counters.subcounters.watchedUserId", "post.counters.subcounters.watchedUser")
            .where("post.id = :id", { id: 1 })
            .andWhere("post.counters.code = :code", { code: 111 })
            .andWhere("post.counters.subcounters.version = :version", {
            version: 1,
        })
            .getOne();
        (0, chai_1.expect)(loadedPost.should.be.eql({
            id: 1,
            title: "About BMW",
            counters: {
                code: 111,
                likes: 1,
                comments: 2,
                favorites: 3,
                categoryId: { id: 1, name: "cars" },
                subcounters: {
                    version: 1,
                    watches: 2,
                    watchedUserId: { id: 1, name: "Alice" },
                },
            },
        }));
    })));
});
//# sourceMappingURL=embedded-with-multiple-pk.js.map