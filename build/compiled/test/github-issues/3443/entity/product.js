"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const category_1 = require("./category");
let Product = class Product {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => category_1.Category, (category) => category.products),
    (0, src_1.JoinTable)({ name: "product_category", synchronize: false }),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "categories", void 0);
Product = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "product" })
], Product);
exports.Product = Product;
//# sourceMappingURL=product.js.map