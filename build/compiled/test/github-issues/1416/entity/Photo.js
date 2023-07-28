"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const PhotoMetadata_1 = require("./PhotoMetadata");
const Author_1 = require("./Author");
let Photo = class Photo {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("text"),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "description", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "filename", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Photo.prototype, "isPublished", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Author_1.Author, (author) => author.photos),
    tslib_1.__metadata("design:type", Author_1.Author)
], Photo.prototype, "author", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => PhotoMetadata_1.PhotoMetadata, (photoMetadata) => photoMetadata.photo, {
        eager: true,
    }),
    (0, index_1.JoinColumn)(),
    tslib_1.__metadata("design:type", PhotoMetadata_1.PhotoMetadata)
], Photo.prototype, "metadata", void 0);
Photo = tslib_1.__decorate([
    (0, index_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map