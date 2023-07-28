"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Category_1 = require("./Category");
const OneToMany_1 = require("../../../../../src/decorator/relations/OneToMany");
const Column_1 = require("../../../../../src/decorator/columns/Column");
let Product = class Product {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)(() => Category_1.Category, (category) => category.product, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "categories", void 0);
Product = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map