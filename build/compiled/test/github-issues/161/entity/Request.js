"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const Ticket_1 = require("./Ticket");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Request = class Request {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Request.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Request.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Request.prototype, "type", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Request.prototype, "success", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Ticket_1.Ticket, (ticket) => ticket.request),
    tslib_1.__metadata("design:type", Ticket_1.Ticket)
], Request.prototype, "ticket", void 0);
Request = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Request);
exports.Request = Request;
//# sourceMappingURL=Request.js.map