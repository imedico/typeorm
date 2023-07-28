"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Flight = class Flight {
    constructor(id, date) {
        this.id = id;
        this.date = date;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Flight.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("timestamp with time zone"),
    tslib_1.__metadata("design:type", Date)
], Flight.prototype, "date", void 0);
Flight = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Number, Date])
], Flight);
exports.Flight = Flight;
//# sourceMappingURL=Flight.js.map