"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketProduct = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Product_1 = require("./Product");
const Ticket_1 = require("./Ticket");
let TicketProduct = class TicketProduct {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TicketProduct.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Product_1.Product, (product) => product.ticketProduct),
    tslib_1.__metadata("design:type", Product_1.Product)
], TicketProduct.prototype, "product", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Ticket_1.Ticket, (ticket) => ticket.ticketItems),
    tslib_1.__metadata("design:type", Ticket_1.Ticket)
], TicketProduct.prototype, "ticket", void 0);
TicketProduct = tslib_1.__decorate([
    (0, src_1.Entity)()
], TicketProduct);
exports.TicketProduct = TicketProduct;
//# sourceMappingURL=TicketProduct.js.map