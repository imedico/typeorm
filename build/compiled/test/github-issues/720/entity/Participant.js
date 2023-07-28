"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Participant = class Participant {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Participant.prototype, "order_id", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Participant.prototype, "distance", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Participant.prototype, "price", void 0);
Participant = tslib_1.__decorate([
    (0, Entity_1.Entity)("participants")
], Participant);
exports.Participant = Participant;
//# sourceMappingURL=Participant.js.map