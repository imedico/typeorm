"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Tree_1 = require("../../../../src/decorator/tree/Tree");
const TreeParent_1 = require("../../../../src/decorator/tree/TreeParent");
const TreeChildren_1 = require("../../../../src/decorator/tree/TreeChildren");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Category = class Category {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, TreeParent_1.TreeParent)(),
    tslib_1.__metadata("design:type", Category)
], Category.prototype, "parentCategory", void 0);
tslib_1.__decorate([
    (0, TreeChildren_1.TreeChildren)({ cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "childCategories", void 0);
Category = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, Tree_1.Tree)("closure-table")
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map