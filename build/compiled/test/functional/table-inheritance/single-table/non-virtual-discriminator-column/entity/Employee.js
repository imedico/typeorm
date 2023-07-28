"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const ChildEntity_1 = require("../../../../../../src/decorator/entity/ChildEntity");
const Person_1 = require("./Person");
let Employee = class Employee extends Person_1.Person {
};
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Employee.prototype, "salary", void 0);
Employee = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)("employee-type")
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map