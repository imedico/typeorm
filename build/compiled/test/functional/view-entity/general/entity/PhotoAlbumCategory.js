"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoAlbumCategory = void 0;
const tslib_1 = require("tslib");
const ViewColumn_1 = require("../../../../../src/decorator/columns/ViewColumn");
const ViewEntity_1 = require("../../../../../src/decorator/entity-view/ViewEntity");
const Album_1 = require("./Album");
const Category_1 = require("./Category");
const Photo_1 = require("./Photo");
let PhotoAlbumCategory = class PhotoAlbumCategory {
};
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], PhotoAlbumCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], PhotoAlbumCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], PhotoAlbumCategory.prototype, "categoryName", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], PhotoAlbumCategory.prototype, "albumName", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)({ name: "albumId" }),
    tslib_1.__metadata("design:type", Number)
], PhotoAlbumCategory.prototype, "photoAlbumId", void 0);
PhotoAlbumCategory = tslib_1.__decorate([
    (0, ViewEntity_1.ViewEntity)({
        expression: (connection) => connection
            .createQueryBuilder()
            .select("photo.id", "id")
            .addSelect("photo.name", "name")
            .addSelect("photo.albumId", "albumId")
            .addSelect("category.name", "categoryName")
            .addSelect("album.name", "albumName")
            .from(Photo_1.Photo, "photo")
            .leftJoin(Album_1.Album, "album", "album.id = photo.albumId")
            .leftJoin(Category_1.Category, "category", "category.id = album.categoryId")
            .where(`category.name = 'Cars'`),
    })
], PhotoAlbumCategory);
exports.PhotoAlbumCategory = PhotoAlbumCategory;
//# sourceMappingURL=PhotoAlbumCategory.js.map