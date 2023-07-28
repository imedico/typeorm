"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Abbreviation = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Abbreviation = class Abbreviation {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Abbreviation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Abbreviation.prototype, "name", void 0);
Abbreviation = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Abbreviation);
exports.Abbreviation = Abbreviation;
//# sourceMappingURL=Abbreviation.js.map