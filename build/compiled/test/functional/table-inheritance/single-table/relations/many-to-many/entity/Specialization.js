"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Specialization = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
const Teacher_1 = require("./Teacher");
let Specialization = class Specialization {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Specialization.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Specialization.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Teacher_1.Teacher, (teacher) => teacher.specializations),
    tslib_1.__metadata("design:type", Array)
], Specialization.prototype, "teachers", void 0);
Specialization = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Specialization);
exports.Specialization = Specialization;
//# sourceMappingURL=Specialization.js.map