"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonAR = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const src_1 = require("../../../../../src");
let PersonAR = class PersonAR extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PersonAR.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PersonAR.prototype, "name", void 0);
PersonAR = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PersonAR);
exports.PersonAR = PersonAR;
//# sourceMappingURL=PersonAR.js.map