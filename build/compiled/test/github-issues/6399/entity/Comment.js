"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Post_1 = require("./Post");
let Comment = class Comment {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Comment.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "text", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Comment.prototype, "postId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Post_1.Post, (entity) => entity.comments),
    (0, src_1.JoinColumn)({
        name: "postId",
    }),
    tslib_1.__metadata("design:type", Post_1.Post)
], Comment.prototype, "post", void 0);
Comment = tslib_1.__decorate([
    (0, src_1.Entity)()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map