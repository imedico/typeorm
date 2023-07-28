"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Car = class Car {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Car.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Car.prototype, "name", void 0);
Car = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Car);
exports.Car = Car;
//# sourceMappingURL=Car.js.map