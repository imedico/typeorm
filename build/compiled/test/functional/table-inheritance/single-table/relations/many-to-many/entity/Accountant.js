"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accountant = void 0;
const tslib_1 = require("tslib");
const ChildEntity_1 = require("../../../../../../../src/decorator/entity/ChildEntity");
const ManyToMany_1 = require("../../../../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../../../../src/decorator/relations/JoinTable");
const Employee_1 = require("./Employee");
const Department_1 = require("./Department");
let Accountant = class Accountant extends Employee_1.Employee {
};
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Department_1.Department, (department) => department.accountants),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Accountant.prototype, "departments", void 0);
Accountant = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)()
], Accountant);
exports.Accountant = Accountant;
//# sourceMappingURL=Accountant.js.map