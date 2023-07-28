"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("github issues > #813 order by must support functions", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work perfectly", () => Promise.all(connections.map(async (connection) => {
        if (!DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            return;
        const categories = [new Category_1.Category(), new Category_1.Category()];
        await connection.manager.save(categories);
        const post = new Post_1.Post();
        post.title = "About order by";
        post.categories = categories;
        await connection.manager.save(post);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .orderBy("RAND()")
            .getMany();
        posts[0].id.should.be.equal(1);
        posts[0].title.should.be.equal("About order by");
    })));
    it("should work perfectly with pagination as well", () => Promise.all(connections.map(async (connection) => {
        if (!DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
            return;
        const categories = [new Category_1.Category(), new Category_1.Category()];
        await connection.manager.save(categories);
        const post = new Post_1.Post();
        post.title = "About order by";
        post.categories = categories;
        await connection.manager.save(post);
        const posts = await connection
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .orderBy("RAND()")
            .skip(0)
            .take(1)
            .getMany();
        posts[0].id.should.be.equal(1);
        posts[0].title.should.be.equal("About order by");
    })));
});
//# sourceMappingURL=issue-813.js.map