"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
class Unit {
}
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Unit.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Unit.prototype, "type", void 0);
exports.Unit = Unit;
//# sourceMappingURL=Unit.js.map