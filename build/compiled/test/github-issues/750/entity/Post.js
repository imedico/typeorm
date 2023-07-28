"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Index_1 = require("../../../../src/decorator/Index");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("point"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "point", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("polygon"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "polygon", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, Index_1.Index)(["name"], { fulltext: true }),
    (0, Index_1.Index)(["point"], { spatial: true })
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map