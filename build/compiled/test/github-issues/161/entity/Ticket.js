"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const Request_1 = require("./Request");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Ticket = class Ticket {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Ticket.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Ticket.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Request_1.Request, {
        cascade: true,
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Request_1.Request)
], Ticket.prototype, "request", void 0);
Ticket = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Ticket);
exports.Ticket = Ticket;
//# sourceMappingURL=Ticket.js.map