"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ChildEntity_1 = require("../../../../../../src/decorator/entity/ChildEntity");
const Person_1 = require("./Person");
let Student = class Student extends Person_1.Person {
};
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Student.prototype, "faculty", void 0);
Student = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)(0)
], Student);
exports.Student = Student;
//# sourceMappingURL=Student.js.map