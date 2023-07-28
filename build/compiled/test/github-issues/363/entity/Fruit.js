"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fruit = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Fruit = class Fruit {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Fruit.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Fruit.prototype, "name", void 0);
Fruit = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Fruit);
exports.Fruit = Fruit;
//# sourceMappingURL=Fruit.js.map