"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Post = class Post extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        default: "This is default text.",
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        default: null,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "comments", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)("post_test")
], Post);
exports.Post = Post;
//# sourceMappingURL=post_with_null_1.entity.js.map