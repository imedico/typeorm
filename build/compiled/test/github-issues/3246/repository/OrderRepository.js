"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const tslib_1 = require("tslib");
const Order_1 = require("../entity/Order");
const src_1 = require("../../../../src");
let OrderRepository = class OrderRepository extends src_1.AbstractRepository {
    async createOrder(order) {
        return this.repository.save(order);
    }
};
OrderRepository = tslib_1.__decorate([
    (0, src_1.EntityRepository)(Order_1.Order)
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map