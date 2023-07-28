"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Order_1 = require("./Order");
const Product_1 = require("./Product");
let OrderItem = class OrderItem {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], OrderItem.prototype, "orderId", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], OrderItem.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Order_1.Order, (recurringOrder) => recurringOrder.items),
    tslib_1.__metadata("design:type", Order_1.Order)
], OrderItem.prototype, "order", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Product_1.Product),
    tslib_1.__metadata("design:type", Product_1.Product)
], OrderItem.prototype, "product", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], OrderItem.prototype, "amount", void 0);
OrderItem = tslib_1.__decorate([
    (0, src_1.Entity)()
], OrderItem);
exports.OrderItem = OrderItem;
//# sourceMappingURL=OrderItem.js.map