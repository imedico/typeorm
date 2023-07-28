"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Broker = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Order_1 = require("./Order");
let Broker = class Broker {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Broker.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "varchar", nullable: true }),
    tslib_1.__metadata("design:type", String)
], Broker.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => Order_1.Order, (order) => order.company, {
        cascade: ["insert", "update"],
        onDelete: "CASCADE",
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Order_1.Order)
], Broker.prototype, "orders", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Broker.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Broker.prototype, "modifiedDate", void 0);
Broker = tslib_1.__decorate([
    (0, src_1.Entity)()
], Broker);
exports.Broker = Broker;
//# sourceMappingURL=Broker.js.map