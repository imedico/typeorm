"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
const ImageDetails_1 = require("./ImageDetails");
const JoinColumn_1 = require("../../../src/decorator/relations/JoinColumn");
let Image = class Image {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Image.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Image.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Post_1.Post, (post) => post.images),
    tslib_1.__metadata("design:type", Post_1.Post)
], Image.prototype, "post", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Post_1.Post, (post) => post.secondaryImages, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", Post_1.Post)
], Image.prototype, "secondaryPost", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => ImageDetails_1.ImageDetails, (details) => details.image, {
        cascade: true,
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", ImageDetails_1.ImageDetails)
], Image.prototype, "details", void 0);
Image = tslib_1.__decorate([
    (0, index_1.Entity)("sample10_image")
], Image);
exports.Image = Image;
//# sourceMappingURL=Image.js.map