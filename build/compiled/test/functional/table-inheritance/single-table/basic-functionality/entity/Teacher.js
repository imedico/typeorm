"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ChildEntity_1 = require("../../../../../../src/decorator/entity/ChildEntity");
const Employee_1 = require("./Employee");
let Teacher = class Teacher extends Employee_1.Employee {
};
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Teacher.prototype, "specialization", void 0);
Teacher = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)()
], Teacher);
exports.Teacher = Teacher;
//# sourceMappingURL=Teacher.js.map