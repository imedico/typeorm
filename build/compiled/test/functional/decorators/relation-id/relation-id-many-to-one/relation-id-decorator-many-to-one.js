"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
describe("decorators > relation-id-decorator > many-to-one", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load ids when RelationId decorator used", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.id = 1;
        category1.name = "cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.id = 2;
        category2.name = "airplanes";
        await connection.manager.save(category2);
        const categoryByName1 = new Category_1.Category();
        categoryByName1.id = 3;
        categoryByName1.name = "BMW";
        await connection.manager.save(categoryByName1);
        const categoryByName2 = new Category_1.Category();
        categoryByName2.id = 4;
        categoryByName2.name = "Boeing";
        await connection.manager.save(categoryByName2);
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.title = "about BWM";
        post1.category = category1;
        post1.categoryByName = categoryByName1;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.id = 2;
        post2.title = "about Boeing";
        post2.category = category2;
        post2.categoryByName = categoryByName2;
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .orderBy("post.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].categoryId).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categoryName).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[0].categoryName).to.be.equal("BMW");
        (0, chai_1.expect)(loadedPosts[1].categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].categoryId).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[1].categoryName).to.not.be.undefined;
        (0, chai_1.expect)(loadedPosts[1].categoryName).to.be.equal("Boeing");
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .where("post.id = :id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryId).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryId).to.be.equal(1);
        (0, chai_1.expect)(loadedPost.categoryName).to.not.be.undefined;
        (0, chai_1.expect)(loadedPost.categoryName).to.be.equal("BMW");
    })));
});
//# sourceMappingURL=relation-id-decorator-many-to-one.js.map