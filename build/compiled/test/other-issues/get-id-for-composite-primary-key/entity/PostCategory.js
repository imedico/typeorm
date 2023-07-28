"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategory = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Category_1 = require("./Category");
const Post_1 = require("./Post");
let PostCategory = class PostCategory {
};
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Post_1.Post),
    tslib_1.__metadata("design:type", Promise)
], PostCategory.prototype, "post", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Object)
], PostCategory.prototype, "postId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Category_1.Category),
    tslib_1.__metadata("design:type", Promise)
], PostCategory.prototype, "category", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Object)
], PostCategory.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostCategory.prototype, "added", void 0);
PostCategory = tslib_1.__decorate([
    (0, src_1.Entity)()
], PostCategory);
exports.PostCategory = PostCategory;
//# sourceMappingURL=PostCategory.js.map