"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Site_1 = require("./Site");
let Category = class Category extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "pk", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        length: 250,
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    tslib_1.__metadata("design:type", Object)
], Category.prototype, "parentCategory", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "childCategories", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Site_1.Site, (site) => site.parentCategory),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "sites", void 0);
Category = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("materialized-path")
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map