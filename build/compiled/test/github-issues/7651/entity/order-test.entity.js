"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderTestEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const order_1 = require("./order");
let OrderTestEntity = class OrderTestEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], OrderTestEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: order_1.Order, default: order_1.Order.FIRST }),
    tslib_1.__metadata("design:type", String)
], OrderTestEntity.prototype, "order", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: order_1.Order, default: [order_1.Order.FIRST], array: true }),
    tslib_1.__metadata("design:type", Array)
], OrderTestEntity.prototype, "orders", void 0);
OrderTestEntity = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "order_test" })
], OrderTestEntity);
exports.OrderTestEntity = OrderTestEntity;
//# sourceMappingURL=order-test.entity.js.map