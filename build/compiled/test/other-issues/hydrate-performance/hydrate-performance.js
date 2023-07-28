"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("other issues > hydration performance", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("if entity was changed in the listener, changed property should be updated in the db", () => Promise.all(connections.map(async function (connection) {
        // insert few posts first
        const posts = [];
        for (let i = 1; i <= 100000; i++) {
            posts.push(new Post_1.Post("Post #" + i));
        }
        await connection.manager.insert(Post_1.Post, posts);
        // select them using raw sql
        // console.time("select using raw sql");
        const loadedRawPosts = await connection.manager.query("SELECT * FROM post");
        loadedRawPosts.length.should.be.equal(100000);
        // console.timeEnd("select using raw sql");
        // now select them using ORM
        // console.time("select using ORM");
        const loadedOrmPosts = await connection.manager.find(Post_1.Post);
        loadedOrmPosts.length.should.be.equal(100000);
        // console.timeEnd("select using ORM");
    })));
});
//# sourceMappingURL=hydrate-performance.js.map