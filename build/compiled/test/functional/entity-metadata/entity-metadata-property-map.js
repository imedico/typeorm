"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Subcounters_1 = require("./entity/Subcounters");
const User_1 = require("./entity/User");
describe("entity-metadata > property-map", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create correct property map object", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.id = 1;
        user1.name = "Alice";
        const post1 = new Post_1.Post();
        post1.title = "About cars";
        post1.counters = new Counters_1.Counters();
        post1.counters.code = 1;
        post1.counters.comments = 1;
        post1.counters.favorites = 2;
        post1.counters.likes = 3;
        post1.counters.likedUsers = [user1];
        post1.counters.subcounters = new Subcounters_1.Subcounters();
        post1.counters.subcounters.version = 1;
        post1.counters.subcounters.watches = 5;
        post1.counters.subcounters.watchedUsers = [user1];
        const postPropertiesMap = connection.getMetadata(Post_1.Post).propertiesMap;
        (0, chai_1.expect)(postPropertiesMap.should.be.eql({
            id: "id",
            title: "title",
            counters: {
                code: "counters.code",
                likes: "counters.likes",
                comments: "counters.comments",
                favorites: "counters.favorites",
                subcounters: {
                    version: "counters.subcounters.version",
                    watches: "counters.subcounters.watches",
                    watchedUsers: "counters.subcounters.watchedUsers",
                },
                likedUsers: "counters.likedUsers",
            },
        }));
    })));
});
//# sourceMappingURL=entity-metadata-property-map.js.map