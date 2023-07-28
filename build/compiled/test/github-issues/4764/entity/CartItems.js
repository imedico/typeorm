"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItems = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Cart_1 = require("./Cart");
let CartItems = class CartItems {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CartItems.prototype, "ID", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CartItems.prototype, "CartID", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CartItems.prototype, "ItemID", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CartItems.prototype, "OptionID", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CartItems.prototype, "Quantity", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], CartItems.prototype, "RegDate", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], CartItems.prototype, "ModifiedDate", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Cart_1.Cart, (t) => t.CartItems),
    (0, src_1.JoinColumn)({ name: "CartID" }),
    tslib_1.__metadata("design:type", Cart_1.Cart)
], CartItems.prototype, "Cart", void 0);
CartItems = tslib_1.__decorate([
    (0, src_1.Entity)()
], CartItems);
exports.CartItems = CartItems;
//# sourceMappingURL=CartItems.js.map