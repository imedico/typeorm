"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
const Category_1 = require("./entity/Category");
describe("github issues > #70 cascade deleting works incorrect", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully and return persisted entity", () => Promise.all(connections.map(async (connection) => {
        // Spanner support only NO ACTION clause
        if (connection.driver.options.type === "spanner")
            return;
        // create objects to save
        const category1 = new Category_1.Category();
        category1.name = "category #1";
        const category2 = new Category_1.Category();
        category2.name = "category #2";
        const post = new Post_1.Post();
        post.title = "Hello Post #1";
        post.categories = [category1, category2];
        // persist post (other are persisted by cascades)
        await connection.manager.save(post);
        // check that all persisted objects exist
        const loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .innerJoinAndSelect("post.categories", "category")
            .orderBy("post.id, category.id")
            .getOne();
        const loadedCategories = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .orderBy("category.id")
            .getMany();
        (0, chai_1.expect)(loadedPost).not.to.be.null;
        loadedPost.should.deep.include({
            id: 1,
            title: "Hello Post #1",
        });
        loadedPost.categories.length.should.be.equal(2);
        (0, chai_1.expect)(loadedCategories).not.to.be.undefined;
        loadedCategories[0].id.should.be.equal(1);
        loadedCategories[1].id.should.be.equal(2);
        // now remove post. categories should be removed too
        await connection.manager.remove(post);
        // load them again to make sure they are not exist anymore
        const loadedPosts2 = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .getMany();
        const loadedCategories2 = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .getMany();
        (0, chai_1.expect)(loadedPosts2).to.be.eql([]);
        (0, chai_1.expect)(loadedCategories2).to.be.eql([]);
    })));
});
//# sourceMappingURL=issue-70.js.map