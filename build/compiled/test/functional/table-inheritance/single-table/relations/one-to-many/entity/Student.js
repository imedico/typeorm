"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const tslib_1 = require("tslib");
const ChildEntity_1 = require("../../../../../../../src/decorator/entity/ChildEntity");
const OneToMany_1 = require("../../../../../../../src/decorator/relations/OneToMany");
const Person_1 = require("./Person");
const Faculty_1 = require("./Faculty");
let Student = class Student extends Person_1.Person {
};
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Faculty_1.Faculty, (faculty) => faculty.student),
    tslib_1.__metadata("design:type", Array)
], Student.prototype, "faculties", void 0);
Student = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)()
], Student);
exports.Student = Student;
//# sourceMappingURL=Student.js.map