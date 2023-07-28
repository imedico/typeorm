"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCustomer = void 0;
const tslib_1 = require("tslib");
const Order_1 = require("./Order");
const src_1 = require("../../../../src");
let OrderCustomer = class OrderCustomer {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], OrderCustomer.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "varchar", nullable: false }),
    tslib_1.__metadata("design:type", String)
], OrderCustomer.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Order_1.Order, (order) => order.orderCustomer, {
        cascade: ["insert", "update"],
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Order_1.Order)
], OrderCustomer.prototype, "order", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], OrderCustomer.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], OrderCustomer.prototype, "modifiedDate", void 0);
OrderCustomer = tslib_1.__decorate([
    (0, src_1.Entity)()
], OrderCustomer);
exports.OrderCustomer = OrderCustomer;
//# sourceMappingURL=OrderCustomer.js.map