"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const TreeLevelColumn_1 = require("../../../src/decorator/tree/TreeLevelColumn");
const TreeParent_1 = require("../../../src/decorator/tree/TreeParent");
const TreeChildren_1 = require("../../../src/decorator/tree/TreeChildren");
const Tree_1 = require("../../../src/decorator/tree/Tree");
const Entity_1 = require("../../../src/decorator/entity/Entity");
let Category = class Category {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
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
tslib_1.__decorate([
    (0, TreeLevelColumn_1.TreeLevelColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "level", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)("sample22_category"),
    (0, Tree_1.Tree)("closure-table")
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map