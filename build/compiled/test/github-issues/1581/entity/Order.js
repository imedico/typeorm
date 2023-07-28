"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const tslib_1 = require("tslib");
const DeliverySlot_1 = require("./DeliverySlot");
const User_1 = require("./User");
const OrderItem_1 = require("./OrderItem");
const src_1 = require("../../../../src");
let Order = class Order {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "deliverySlotId", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => DeliverySlot_1.DeliverySlot),
    tslib_1.__metadata("design:type", DeliverySlot_1.DeliverySlot)
], Order.prototype, "deliverySlot", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => User_1.User, (user) => user.recurringOrders),
    tslib_1.__metadata("design:type", User_1.User)
], Order.prototype, "user", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Order.prototype, "enabled", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => OrderItem_1.OrderItem, (item) => item.order),
    tslib_1.__metadata("design:type", Array)
], Order.prototype, "items", void 0);
Order = tslib_1.__decorate([
    (0, src_1.Entity)()
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map