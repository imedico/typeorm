"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostImage = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
let PostImage = class PostImage {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostImage.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostImage.prototype, "url", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Post_1.Post, (post) => post.image),
    tslib_1.__metadata("design:type", Array)
], PostImage.prototype, "posts", void 0);
PostImage = tslib_1.__decorate([
    (0, index_1.Entity)("sample3_post_image")
], PostImage);
exports.PostImage = PostImage;
//# sourceMappingURL=PostImage.js.map