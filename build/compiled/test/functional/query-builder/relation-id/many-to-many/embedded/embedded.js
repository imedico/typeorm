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
describe("query builder > relation-id > many-to-many > embedded", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load ids when loadRelationIdAndMap used on embedded and nested embedded tables", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "Alice";
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.name = "Bob";
        await connection.manager.save(user2);
        const user3 = new User_1.User();
        user3.name = "Clara";
        await connection.manager.save(user3);
        const category1 = new Category_1.Category();
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "BMW";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.name = "airplanes";
        await connection.manager.save(category3);
        const category4 = new Category_1.Category();
        category4.name = "Boeing";
        await connection.manager.save(category4);
        const post1 = new Post_1.Post();
        post1.title = "About BMW";
        post1.counters = new Counters_1.Counters();
        post1.counters.likes = 1;
        post1.counters.comments = 2;
        post1.counters.favorites = 3;
        post1.counters.categories = [category1, category2];
        post1.counters.subcounters = new Subcounters_1.Subcounters();
        post1.counters.subcounters.version = 1;
        post1.counters.subcounters.watches = 2;
        post1.counters.subcounters.watchedUsers = [user1, user2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "About Boeing";
        post2.counters = new Counters_1.Counters();
        post2.counters.likes = 3;
        post2.counters.comments = 4;
        post2.counters.favorites = 5;
        post2.counters.categories = [category3, category4];
        post2.counters.subcounters = new Subcounters_1.Subcounters();
        post2.counters.subcounters.version = 1;
        post2.counters.subcounters.watches = 1;
        post2.counters.subcounters.watchedUsers = [user3];
        await connection.manager.save(post2);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .loadRelationIdAndMap("post.counters.categoryIds", "post.counters.categories")
            .loadRelationIdAndMap("post.counters.subcounters.watchedUserIds", "post.counters.subcounters.watchedUsers")
            .orderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].should.be.eql({
            title: "About BMW",
            counters: {
                likes: 1,
                comments: 2,
                favorites: 3,
                categoryIds: [1, 2],
                subcounters: {
                    id: 1,
                    version: 1,
                    watches: 2,
                    watchedUserIds: [1, 2],
                },
            },
        }));
        (0, chai_1.expect)(loadedPosts[1].should.be.eql({
            title: "About Boeing",
            counters: {
                likes: 3,
                comments: 4,
                favorites: 5,
                categoryIds: [3, 4],
                subcounters: {
                    id: 2,
                    version: 1,
                    watches: 1,
                    watchedUserIds: [3],
                },
            },
        }));
    })));
});
//# sourceMappingURL=embedded.js.map