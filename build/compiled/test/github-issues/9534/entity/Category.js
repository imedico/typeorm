"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const TreeParent_1 = require("../../../../src/decorator/tree/TreeParent");
const TreeChildren_1 = require("../../../../src/decorator/tree/TreeChildren");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Tree_1 = require("../../../../src/decorator/tree/Tree");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
let Category = class Category {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        type: "varchar",
        name: "uid",
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "uid", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        type: "varchar",
        name: "parentUid",
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Category.prototype, "parentUid", void 0);
tslib_1.__decorate([
    (0, TreeParent_1.TreeParent)(),
    (0, JoinColumn_1.JoinColumn)({
        name: "parentUid",
        referencedColumnName: "uid",
    }),
    tslib_1.__metadata("design:type", Object)
], Category.prototype, "parentCategory", void 0);
tslib_1.__decorate([
    (0, TreeChildren_1.TreeChildren)({ cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "childCategories", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)({ name: "categories" }),
    (0, Tree_1.Tree)("materialized-path")
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map