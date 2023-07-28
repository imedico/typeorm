"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Student_1 = require("./Student");
let Teacher = class Teacher {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Teacher.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Teacher.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => Student_1.Student, (student) => student.teacher),
    tslib_1.__metadata("design:type", Array)
], Teacher.prototype, "students", void 0);
Teacher = tslib_1.__decorate([
    (0, src_1.Entity)()
], Teacher);
exports.Teacher = Teacher;
//# sourceMappingURL=Teacher.js.map