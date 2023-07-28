"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Student_1 = require("./Student");
const OneToMany_1 = require("../../../../src/decorator/relations/OneToMany");
const Index_1 = require("../../../../src/decorator/Index");
let Teacher = class Teacher {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Teacher.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Teacher.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Student_1.Student, (student) => student.teacher),
    tslib_1.__metadata("design:type", Array)
], Teacher.prototype, "students", void 0);
Teacher = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)("ignored_index", { synchronize: false })
], Teacher);
exports.Teacher = Teacher;
//# sourceMappingURL=Teacher.js.map