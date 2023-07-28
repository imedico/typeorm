"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const ManyToOne_1 = require("../../../../../../../src/decorator/relations/ManyToOne");
const Accountant_1 = require("./Accountant");
let Department = class Department {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Department.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Department.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Accountant_1.Accountant, (accountant) => accountant.departments),
    tslib_1.__metadata("design:type", Accountant_1.Accountant)
], Department.prototype, "accountant", void 0);
Department = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Department);
exports.Department = Department;
//# sourceMappingURL=Department.js.map