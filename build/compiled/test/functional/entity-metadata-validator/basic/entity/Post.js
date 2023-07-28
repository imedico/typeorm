"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const RelationCount_1 = require("../../../../../src/decorator/relations/RelationCount");
const ManyToMany_1 = require("../../../../../src/decorator/relations/ManyToMany");
const Category_1 = require("./Category");
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
    (0, OneToOne_1.OneToOne)((type) => Category_1.Category),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "category2", void 0);
tslib_1.__decorate([
    (0, RelationCount_1.RelationCount)((post) => post.category),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "categoryCount", void 0);
tslib_1.__decorate([
    (0, RelationCount_1.RelationCount)((post) => post.category2),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "categoryCount2", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map