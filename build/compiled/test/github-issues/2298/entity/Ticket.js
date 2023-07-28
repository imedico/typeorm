"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const TicketProduct_1 = require("./TicketProduct");
let Ticket = class Ticket {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Ticket.prototype, "shopId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Ticket.prototype, "chainId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => TicketProduct_1.TicketProduct, (ticketProduct) => ticketProduct.ticket),
    tslib_1.__metadata("design:type", Array)
], Ticket.prototype, "ticketItems", void 0);
Ticket = tslib_1.__decorate([
    (0, src_1.Entity)()
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=Ticket.js.map