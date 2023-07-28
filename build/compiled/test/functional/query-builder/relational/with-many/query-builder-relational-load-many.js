"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Image_1 = require("./entity/Image");
const test_utils_1 = require("../../../../utils/test-utils");
const chai_1 = require("chai");
describe("query builder > relational with many > load many", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load relation entity of a given entity object", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.url = "image #1";
        await connection.manager.save(image1);
        const image2 = new Image_1.Image();
        image2.url = "image #2";
        await connection.manager.save(image2);
        const image3 = new Image_1.Image();
        image3.url = "image #3";
        await connection.manager.save(image3);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        post1.images = [image1, image2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        post2.images = [image2, image3];
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #3";
        post3.images = [image1, image3];
        await connection.manager.save(post3);
        const loadedPost1 = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        loadedPost1.images = await connection
            .createQueryBuilder()
            .relation(Post_1.Post, "images")
            .of(post1)
            .loadMany();
        (0, chai_1.expect)(loadedPost1.images).to.deep.include({
            id: 1,
            url: "image #1",
        });
        (0, chai_1.expect)(loadedPost1.images).to.deep.include({
            id: 2,
            url: "image #2",
        });
        (0, chai_1.expect)(loadedPost1.images).to.not.contain({
            id: 3,
            url: "image #3",
        });
    })));
    it("should load relation entity of a given entity id map", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.url = "image #1";
        await connection.manager.save(image1);
        const image2 = new Image_1.Image();
        image2.url = "image #2";
        await connection.manager.save(image2);
        const image3 = new Image_1.Image();
        image3.url = "image #3";
        await connection.manager.save(image3);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        post1.images = [image1, image2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        post2.images = [image2, image3];
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #3";
        post3.images = [image1, image3];
        await connection.manager.save(post3);
        const loadedPost1 = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        loadedPost1.images = await connection
            .createQueryBuilder()
            .relation(Post_1.Post, "images")
            .of({ id: 1 })
            .loadMany();
        (0, chai_1.expect)(loadedPost1.images).to.deep.include({
            id: 1,
            url: "image #1",
        });
        (0, chai_1.expect)(loadedPost1.images).to.deep.include({
            id: 2,
            url: "image #2",
        });
        (0, chai_1.expect)(loadedPost1.images).to.not.contain({
            id: 3,
            url: "image #3",
        });
    })));
    it("should load relation entity of a given entity id", () => Promise.all(connections.map(async (connection) => {
        const image1 = new Image_1.Image();
        image1.url = "image #1";
        await connection.manager.save(image1);
        const image2 = new Image_1.Image();
        image2.url = "image #2";
        await connection.manager.save(image2);
        const image3 = new Image_1.Image();
        image3.url = "image #3";
        await connection.manager.save(image3);
        const post1 = new Post_1.Post();
        post1.title = "post #1";
        post1.images = [image1, image2];
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.title = "post #2";
        post2.images = [image2, image3];
        await connection.manager.save(post2);
        const post3 = new Post_1.Post();
        post3.title = "post #3";
        post3.images = [image1, image3];
        await connection.manager.save(post3);
        const loadedPost1 = await connection.manager.findOneBy(Post_1.Post, {
            id: 1,
        });
        loadedPost1.images = await connection
            .createQueryBuilder()
            .relation(Post_1.Post, "images")
            .of(1)
            .loadMany();
        (0, chai_1.expect)(loadedPost1.images).to.deep.include({
            id: 1,
            url: "image #1",
        });
        (0, chai_1.expect)(loadedPost1.images).to.deep.include({
            id: 2,
            url: "image #2",
        });
        (0, chai_1.expect)(loadedPost1.images).to.not.contain({
            id: 3,
            url: "image #3",
        });
    })));
});
//# sourceMappingURL=query-builder-relational-load-many.js.map