"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const tslib_1 = require("tslib");
const ChildEntity_1 = require("../../../../../../../src/decorator/entity/ChildEntity");
const ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
const Person_1 = require("./Person");
const Faculty_1 = require("./Faculty");
const JoinTable_1 = require("../../../../../../../src/decorator/relations/JoinTable");
let Student = class Student extends Person_1.Person {
};
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Faculty_1.Faculty, (faculty) => faculty.students),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Student.prototype, "faculties", void 0);
Student = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)()
], Student);
exports.Student = Student;
//# sourceMappingURL=Student.js.map