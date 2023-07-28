"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderStatus = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["placed"] = "placed";
    OrderStatus["paid"] = "paid";
    OrderStatus["confirmed"] = "confirmed";
    OrderStatus["shipped"] = "shipped";
    OrderStatus["completed"] = "completed";
    OrderStatus["cancelled"] = "cancelled";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
let Order = class Order extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: OrderStatus }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "status", void 0);
Order = tslib_1.__decorate([
    (0, src_1.Entity)()
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.ts.js.map