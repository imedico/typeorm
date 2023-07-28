"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Slug_1 = require("./Slug");
let Category = class Category {
    constructor(slug, parent) {
        this.id = new Slug_1.Slug(slug);
        if (parent)
            this.parent = parent;
    }
};
tslib_1.__decorate([
    (0, src_1.Column)((type) => Slug_1.Slug, { prefix: false }),
    tslib_1.__metadata("design:type", Slug_1.Slug)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    tslib_1.__metadata("design:type", Category)
], Category.prototype, "parent", void 0);
Category = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("materialized-path"),
    tslib_1.__metadata("design:paramtypes", [String, Category])
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map