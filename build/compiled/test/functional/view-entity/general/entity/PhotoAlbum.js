"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoAlbum = exports.removeWhitespace = exports.lowercase = exports.uppercase = void 0;
const tslib_1 = require("tslib");
const ViewColumn_1 = require("../../../../../src/decorator/columns/ViewColumn");
const ViewEntity_1 = require("../../../../../src/decorator/entity-view/ViewEntity");
const Album_1 = require("./Album");
const Photo_1 = require("./Photo");
exports.uppercase = {
    to: (entityValue) => { },
    from: (databaseValue) => databaseValue.toLocaleUpperCase(),
};
exports.lowercase = {
    to: (entityValue) => { },
    from: (databaseValue) => databaseValue.toLocaleLowerCase(),
};
exports.removeWhitespace = {
    to: (entityValue) => { },
    from: (databaseValue) => databaseValue.replace(/\s/g, ""),
};
let PhotoAlbum = class PhotoAlbum {
};
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], PhotoAlbum.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)({ transformer: [exports.lowercase, exports.removeWhitespace] }),
    tslib_1.__metadata("design:type", String)
], PhotoAlbum.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)({ transformer: exports.uppercase }),
    tslib_1.__metadata("design:type", String)
], PhotoAlbum.prototype, "albumName", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)({ name: "albumId" }),
    tslib_1.__metadata("design:type", Number)
], PhotoAlbum.prototype, "photoAlbumId", void 0);
PhotoAlbum = tslib_1.__decorate([
    (0, ViewEntity_1.ViewEntity)({
        expression: (dataSource) => dataSource
            .createQueryBuilder()
            .select("photo.id", "id")
            .addSelect("photo.name", "name")
            .addSelect("photo.albumId", "albumId")
            .addSelect("album.name", "albumName")
            .from(Photo_1.Photo, "photo")
            .leftJoin(Album_1.Album, "album", "album.id = photo.albumId")
            .where("album.name = 'Boeing photos'"),
    })
], PhotoAlbum);
exports.PhotoAlbum = PhotoAlbum;
//# sourceMappingURL=PhotoAlbum.js.map