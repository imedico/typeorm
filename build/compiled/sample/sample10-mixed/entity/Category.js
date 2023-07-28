"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
const PostDetails_1 = require("./PostDetails");
let Category = class Category {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "description", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => Post_1.Post, (post) => post.categories),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "posts", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => PostDetails_1.PostDetails, (postDetails) => postDetails.categories),
    tslib_1.__metadata("design:type", PostDetails_1.PostDetails)
], Category.prototype, "details", void 0);
Category = tslib_1.__decorate([
    (0, index_1.Entity)("sample10_category")
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map