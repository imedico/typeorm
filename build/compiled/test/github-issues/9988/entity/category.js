"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const product_1 = require("./product");
let Category = class Category {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => product_1.Product, (product) => product.categories),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "products", void 0);
Category = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "category" })
], Category);
exports.Category = Category;
//# sourceMappingURL=category.js.map