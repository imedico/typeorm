"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Index_1 = require("../../../../src/decorator/Index");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const Tag_1 = require("./Tag");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "a", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "b", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "c", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)(() => Tag_1.Tag),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Post.prototype, "tag", void 0);
Post = tslib_1.__decorate([
    (0, Index_1.Index)(["a", "b", "c", "tag"]),
    (0, Index_1.Index)(["b", "tag", "c"]),
    (0, Index_1.Index)(["c", "a"]),
    (0, Entity_1.Entity)("Posts")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map