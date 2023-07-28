"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const typings_1 = require("../../../../src/driver/mongodb/typings");
const comment_1 = require("./comment");
const src_1 = require("../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", typings_1.ObjectId)
], Post.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(() => comment_1.Comment),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "comments", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=post.entity.js.map