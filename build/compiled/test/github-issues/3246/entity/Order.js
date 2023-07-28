"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const OrderCustomer_1 = require("./OrderCustomer");
const Broker_1 = require("./Broker");
let Order = class Order {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "varchar", nullable: true }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "orderReferenceNumber", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Broker_1.Broker, (broker) => broker.orders, {
        cascade: false,
        nullable: false, // starts working when set to true
    }),
    tslib_1.__metadata("design:type", Broker_1.Broker)
], Order.prototype, "company", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => OrderCustomer_1.OrderCustomer, (orderCustomer) => orderCustomer.order, {
        cascade: ["insert", "update"],
        onDelete: "CASCADE",
        nullable: true,
    }),
    (0, src_1.JoinColumn)({ name: "orderCustomerId" }),
    tslib_1.__metadata("design:type", OrderCustomer_1.OrderCustomer)
], Order.prototype, "orderCustomer", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "int", nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "orderCustomerId", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Order.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Order.prototype, "modifiedDate", void 0);
Order = tslib_1.__decorate([
    (0, src_1.Entity)()
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map