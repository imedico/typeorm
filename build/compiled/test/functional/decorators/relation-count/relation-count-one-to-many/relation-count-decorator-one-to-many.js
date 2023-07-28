"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const Image_1 = require("./entity/Image");
describe("decorators > relation-count-decorator > one-to-many", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load relation count", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.id = 1;
        image1.isRemoved = true;
        image1.name = "image #1";
        await connection.manager.save(image1);
        const image2 = new Image_1.Image();
        image2.id = 2;
        image2.name = "image #2";
        await connection.manager.save(image2);
        const image3 = new Image_1.Image();
        image3.id = 3;
        image3.name = "image #3";
        await connection.manager.save(image3);
        const category1 = new Category_1.Category();
        category1.id = 1;
        category1.name = "cars";
        category1.isRemoved = true;
        category1.images = [image1, image2];
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.id = 2;
        category2.name = "BMW";
        await connection.manager.save(category2);
        const category3 = new Category_1.Category();
        category3.id = 3;
        category3.name = "airplanes";
        category3.images = [image3];
        await connection.manager.save(category3);
        const post1 = new Post_1.Post();
        post1.id = 1;
        post1.title = "about BMW";
        post1.categories = [category1, category2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.id = 2;
        post2.title = "about Boeing";
        post2.categories = [category3];
        await connection.manager.save(post2);
        let loadedPosts = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .addOrderBy("post.id, categories.id")
            .getMany();
        (0, chai_1.expect)(loadedPosts[0].categoryCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[0].removedCategoryCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categories[0].imageCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPosts[0].categories[0].removedImageCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categories[1].imageCount).to.be.equal(0);
        (0, chai_1.expect)(loadedPosts[1].categoryCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[1].categories[0].imageCount).to.be.equal(1);
        let loadedPost = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect("post.categories", "categories")
            .where("post.id = :id", { id: 1 })
            .addOrderBy("post.id, categories.id")
            .getOne();
        (0, chai_1.expect)(loadedPost.categoryCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.categories[0].imageCount).to.be.equal(2);
        (0, chai_1.expect)(loadedPost.removedCategoryCount).to.be.equal(1);
        (0, chai_1.expect)(loadedPosts[0].categories[1].imageCount).to.be.equal(0);
        (0, chai_1.expect)(loadedPost.categories[0].removedImageCount).to.be.equal(1);
    })));
});
//# sourceMappingURL=relation-count-decorator-one-to-many.js.map