"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const Category_1 = require("./Category");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "category_id" }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "categoryId", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)(() => Category_1.Category),
    (0, JoinColumn_1.JoinColumn)({ name: "category_id" }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map