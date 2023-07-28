"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
const RelationId_1 = require("../../../../../../src/decorator/relations/RelationId");
const Category_1 = require("./Category");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category),
    (0, JoinColumn_1.JoinColumn)({ referencedColumnName: "name" }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "categoryByName", void 0);
tslib_1.__decorate([
    (0, RelationId_1.RelationId)((post) => post.category),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, RelationId_1.RelationId)((post) => post.categoryByName),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "categoryName", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map