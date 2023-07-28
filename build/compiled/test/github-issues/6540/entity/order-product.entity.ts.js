"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProduct = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const order_entity_ts_1 = require("./order.entity.ts");
let OrderProduct = class OrderProduct extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("increment"),
    tslib_1.__metadata("design:type", Number)
], OrderProduct.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: order_entity_ts_1.OrderStatus }),
    tslib_1.__metadata("design:type", String)
], OrderProduct.prototype, "status", void 0);
OrderProduct = tslib_1.__decorate([
    (0, src_1.Entity)()
], OrderProduct);
exports.OrderProduct = OrderProduct;
//# sourceMappingURL=order-product.entity.ts.js.map