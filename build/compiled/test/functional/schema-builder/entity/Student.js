"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Faculty_1 = require("./Faculty");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const Teacher_1 = require("./Teacher");
const Index_1 = require("../../../../src/decorator/Index");
let Student = class Student {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Student.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Student.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Faculty_1.Faculty),
    tslib_1.__metadata("design:type", Faculty_1.Faculty)
], Student.prototype, "faculty", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Teacher_1.Teacher),
    tslib_1.__metadata("design:type", Teacher_1.Teacher)
], Student.prototype, "teacher", void 0);
Student = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)("student_name_index", ["name"])
], Student);
exports.Student = Student;
//# sourceMappingURL=Student.js.map