"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
const tslib_1 = require("tslib");
const ChildEntity_1 = require("../../../../../../../src/decorator/entity/ChildEntity");
const ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../../../../src/decorator/relations/JoinTable");
const Employee_1 = require("./Employee");
const Specialization_1 = require("./Specialization");
let Teacher = class Teacher extends Employee_1.Employee {
};
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Specialization_1.Specialization, (specialization) => specialization.teachers),
    (0, JoinTable_1.JoinTable)({ name: "person_specs" }),
    tslib_1.__metadata("design:type", Array)
], Teacher.prototype, "specializations", void 0);
Teacher = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)()
], Teacher);
exports.Teacher = Teacher;
//# sourceMappingURL=Teacher.js.map