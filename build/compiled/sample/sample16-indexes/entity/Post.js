"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Index_1 = require("../../../src/decorator/Index");
const BasePost_1 = require("./BasePost");
let Post = class Post extends BasePost_1.BasePost {
};
tslib_1.__decorate([
    (0, index_1.Column)(),
    (0, Index_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    (0, Index_1.Index)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "likesCount", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample16_post"),
    (0, Index_1.Index)("my_index_with_id_and_title", (post) => [post.id, post.title])
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map