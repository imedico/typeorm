"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dummy = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const transformer_1 = require("../transformer");
let Dummy = class Dummy {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Dummy.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: Number, transformer: transformer_1.transformer }),
    tslib_1.__metadata("design:type", transformer_1.WrappedNumber)
], Dummy.prototype, "num", void 0);
Dummy = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Dummy);
exports.Dummy = Dummy;
//# sourceMappingURL=dummy.js.map