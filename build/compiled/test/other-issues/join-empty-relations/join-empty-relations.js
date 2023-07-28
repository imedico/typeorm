"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("other issues > joining empty relations", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return empty array if its joined and nothing was found", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.title = "Hello Post";
        await connection.manager.save(post);
        // check if ordering by main object works correctly
        const loadedPosts1 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .getMany();
        (0, chai_1.expect)(loadedPosts1).not.to.be.undefined;
        loadedPosts1.should.be.eql([
            {
                id: 1,
                title: "Hello Post",
                categories: [],
            },
        ]);
    })));
    it("should return empty array if its joined and nothing was found, but relations in empty results should be skipped", () => Promise.all(connections.map(async function (connection) {
        const post = new Post_1.Post();
        post.title = "Hello Post";
        await connection.manager.save(post);
        // check if ordering by main object works correctly
        const loadedPosts1 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .leftJoinAndSelect("categories.authors", "authors")
            .getMany();
        (0, chai_1.expect)(loadedPosts1).not.to.be.undefined;
        loadedPosts1.should.be.eql([
            {
                id: 1,
                title: "Hello Post",
                categories: [],
            },
        ]);
    })));
});
//# sourceMappingURL=join-empty-relations.js.map