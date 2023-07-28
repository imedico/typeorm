"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const Category_1 = require("./entity/Category");
describe("other issues > using limit in conjunction with order by", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully and return persisted entity", () => Promise.all(connections.map(async function (connection) {
        // generate bulk array of posts with categories
        for (let i = 1; i <= 100; i++) {
            const post = new Post_1.Post();
            post.title = "Hello Post #" + i;
            post.categories = [];
            for (let i = 1; i <= 5; i++) {
                const category = new Category_1.Category();
                category.name = "category #" + i;
                post.categories.push(category);
            }
            await connection.manager.save(post);
        }
        // check if ordering by main object works correctly
        const loadedPosts1 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .innerJoinAndSelect("post.categories", "categories")
            .take(10)
            .orderBy("post.id", "DESC")
            .getMany();
        (0, chai_1.expect)(loadedPosts1).not.to.be.undefined;
        loadedPosts1.length.should.be.equal(10);
        loadedPosts1[0].id.should.be.equal(100);
        loadedPosts1[1].id.should.be.equal(99);
        loadedPosts1[2].id.should.be.equal(98);
        loadedPosts1[3].id.should.be.equal(97);
        loadedPosts1[4].id.should.be.equal(96);
        loadedPosts1[5].id.should.be.equal(95);
        loadedPosts1[6].id.should.be.equal(94);
        loadedPosts1[7].id.should.be.equal(93);
        loadedPosts1[8].id.should.be.equal(92);
        loadedPosts1[9].id.should.be.equal(91);
    })));
});
//# sourceMappingURL=limit-with-order-by.js.map