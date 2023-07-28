"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("github issues > #1259 Can't sort by fields added with addSelect", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should order by added selects when pagination is used", () => Promise.all(connections.map(async (connection) => {
        const categories = [new Category_1.Category(), new Category_1.Category()];
        await connection.manager.save(categories);
        const posts = [];
        for (let i = 0; i < 10; i++) {
            const post = new Post_1.Post();
            if (i > 5 && i < 8) {
                post.name = `timber`;
            }
            else {
                post.name = `Tim${i}ber`;
            }
            post.count = 2;
            post.categories = categories;
            posts.push(post);
        }
        await connection.manager.save(posts);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .addSelect("ts_rank_cd(to_tsvector(post.name), to_tsquery(:query))", "rank")
            .leftJoinAndSelect("post.categories", "categories")
            .orderBy("rank", "DESC")
            // .addOrderBy("post.id")
            .take(5)
            .setParameter("query", "timber")
            .getMany();
        loadedPosts.length.should.be.equal(5);
        loadedPosts[0].id.should.be.equal(7);
        loadedPosts[0].name.should.be.equal("timber");
        loadedPosts[1].id.should.be.equal(8);
        loadedPosts[1].name.should.be.equal("timber");
    })));
    it("should order by added selects when pagination is used", () => Promise.all(connections.map(async (connection) => {
        const categories = [new Category_1.Category(), new Category_1.Category()];
        await connection.manager.save(categories);
        const posts = [];
        for (let i = 0; i < 10; i++) {
            const post = new Post_1.Post();
            post.name = `timber`;
            post.count = i * -1;
            post.categories = categories;
            posts.push(post);
        }
        await connection.manager.save(posts);
        const loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .addSelect("post.count * 2", "doublecount")
            .leftJoinAndSelect("post.categories", "categories")
            .orderBy("doublecount")
            .take(5)
            .getMany();
        loadedPosts.length.should.be.equal(5);
        loadedPosts[0].id.should.be.equal(10);
        loadedPosts[1].id.should.be.equal(9);
        loadedPosts[2].id.should.be.equal(8);
        loadedPosts[3].id.should.be.equal(7);
        loadedPosts[4].id.should.be.equal(6);
    })));
});
//# sourceMappingURL=issue-1259.js.map