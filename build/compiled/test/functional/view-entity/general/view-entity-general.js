"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../utils/test-setup");
const chai_1 = require("chai");
const Album_1 = require("./entity/Album");
const Category_1 = require("./entity/Category");
const test_utils_1 = require("../../../utils/test-utils");
const Photo_1 = require("./entity/Photo");
const PhotoAlbumCategory_1 = require("./entity/PhotoAlbumCategory");
const Post_1 = require("./entity/Post");
const PostCategory_1 = require("./entity/PostCategory");
const PhotoAlbum_1 = require("./entity/PhotoAlbum");
describe("view entity > general", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create entity view from query builder definition", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const postCategory = await queryRunner.getView("post_category");
        const photoAlbumCategory = await queryRunner.getView("photo_album_category");
        (0, chai_1.expect)(postCategory).to.be.exist;
        (0, chai_1.expect)(photoAlbumCategory).to.be.exist;
        await queryRunner.release();
    })));
    it("should correctly return data from View", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "Cars";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "Airplanes";
        await connection.manager.save(category2);
        const post1 = new Post_1.Post();
        post1.name = "About BMW";
        post1.categoryId = category1.id;
        await connection.manager.save(post1);
        const post2 = new Post_1.Post();
        post2.name = "About Boeing";
        post2.categoryId = category2.id;
        await connection.manager.save(post2);
        const album1 = new Album_1.Album();
        album1.name = "BMW photos";
        album1.categoryId = category1.id;
        await connection.manager.save(album1);
        const album2 = new Album_1.Album();
        album2.name = "Boeing photos";
        album2.categoryId = category2.id;
        await connection.manager.save(album2);
        const photo1 = new Photo_1.Photo();
        photo1.name = "BMW E39";
        photo1.albumId = album1.id;
        await connection.manager.save(photo1);
        const photo2 = new Photo_1.Photo();
        photo2.name = "BMW E60";
        photo2.albumId = album1.id;
        await connection.manager.save(photo2);
        const photo3 = new Photo_1.Photo();
        photo3.name = "Boeing 737";
        photo3.albumId = album2.id;
        await connection.manager.save(photo3);
        const postCategories = await connection.manager.find(PostCategory_1.PostCategory);
        postCategories.length.should.be.equal(2);
        const postId1 = connection.driver.options.type === "cockroachdb" ? "1" : 1;
        postCategories[0].id.should.be.equal(postId1);
        postCategories[0].name.should.be.equal("About BMW");
        postCategories[0].categoryName.should.be.equal("Cars");
        const postId2 = connection.driver.options.type === "cockroachdb" ? "2" : 2;
        postCategories[1].id.should.be.equal(postId2);
        postCategories[1].name.should.be.equal("About Boeing");
        postCategories[1].categoryName.should.be.equal("Airplanes");
        const photoAlbumCategories = await connection.manager.find(PhotoAlbumCategory_1.PhotoAlbumCategory);
        photoAlbumCategories.length.should.be.equal(2);
        const photoId1 = connection.driver.options.type === "cockroachdb" ? "1" : 1;
        photoAlbumCategories[0].id.should.be.equal(photoId1);
        photoAlbumCategories[0].name.should.be.equal("BMW E39");
        photoAlbumCategories[0].albumName.should.be.equal("BMW photos");
        photoAlbumCategories[0].categoryName.should.be.equal("Cars");
        const photoId2 = connection.driver.options.type === "cockroachdb" ? "2" : 2;
        photoAlbumCategories[1].id.should.be.equal(photoId2);
        photoAlbumCategories[1].name.should.be.equal("BMW E60");
        photoAlbumCategories[1].albumName.should.be.equal("BMW photos");
        photoAlbumCategories[1].categoryName.should.be.equal("Cars");
        const albumId = connection.driver.options.type === "cockroachdb" ? "1" : 1;
        const photoAlbumCategory = await connection.manager.findOneBy(PhotoAlbumCategory_1.PhotoAlbumCategory, { id: 1 });
        photoAlbumCategory.id.should.be.equal(photoId1);
        photoAlbumCategory.name.should.be.equal("BMW E39");
        photoAlbumCategory.albumName.should.be.equal("BMW photos");
        photoAlbumCategory.categoryName.should.be.equal("Cars");
        photoAlbumCategory.photoAlbumId.should.be.equal(albumId);
        const photoAlbums = await connection.manager.find(PhotoAlbum_1.PhotoAlbum);
        const photoId3 = connection.driver.options.type === "cockroachdb" ? "3" : 3;
        photoAlbums[0].id.should.be.equal(photoId3);
        photoAlbums[0].name.should.be.equal("boeing737");
        photoAlbums[0].albumName.should.be.equal("BOEING PHOTOS");
    })));
});
//# sourceMappingURL=view-entity-general.js.map