"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductBrand = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let ProductBrand = class ProductBrand extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ProductBrand.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ProductBrand.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({
        name: "created_at",
        type: "datetime",
        precision: null,
        default: () => "CURRENT_TIMESTAMP",
    }),
    tslib_1.__metadata("design:type", Date)
], ProductBrand.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        name: "updated_at",
        type: "datetime",
        precision: null,
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    tslib_1.__metadata("design:type", Date)
], ProductBrand.prototype, "updatedAt", void 0);
ProductBrand = tslib_1.__decorate([
    (0, src_1.Entity)()
], ProductBrand);
exports.ProductBrand = ProductBrand;
//# sourceMappingURL=ProductBrand.js.map