"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
const JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
const Category_1 = require("./Category");
const OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
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
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "categoryName", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "int", nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "tagName", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "int", nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "tagId", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "categoryWithEmptyJoinCol", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category),
    (0, JoinColumn_1.JoinColumn)({ name: "categoryId" }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "categoryWithoutRefColName", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category),
    (0, JoinColumn_1.JoinColumn)({ referencedColumnName: "name" }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "categoryWithoutColName", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category),
    (0, JoinColumn_1.JoinColumn)({ name: "categoryIdentifier" }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "categoryWithoutRefColName2", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category),
    (0, JoinColumn_1.JoinColumn)({ name: "categoryName", referencedColumnName: "name" }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Tag_1.Tag),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Post.prototype, "tagWithEmptyJoinCol", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Tag_1.Tag),
    (0, JoinColumn_1.JoinColumn)({ name: "tagId" }),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Post.prototype, "tagWithoutRefColName", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Tag_1.Tag),
    (0, JoinColumn_1.JoinColumn)({ referencedColumnName: "name" }),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Post.prototype, "tagWithoutColName", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Tag_1.Tag),
    (0, JoinColumn_1.JoinColumn)({ name: "tagIdentifier" }),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Post.prototype, "tagWithoutRefColName2", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Tag_1.Tag),
    (0, JoinColumn_1.JoinColumn)({ name: "tagName", referencedColumnName: "name" }),
    tslib_1.__metadata("design:type", Tag_1.Tag)
], Post.prototype, "tag", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map