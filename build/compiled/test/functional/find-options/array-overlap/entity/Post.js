"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.PostStatus = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
var PostStatus;
(function (PostStatus) {
    PostStatus["draft"] = "draft";
    PostStatus["published"] = "published";
    PostStatus["unknown"] = "unknown";
})(PostStatus = exports.PostStatus || (exports.PostStatus = {}));
let Post = class Post {
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
        type: "varchar",
        array: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "authors", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enum: PostStatus,
        array: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "statuses", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map