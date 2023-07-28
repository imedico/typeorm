"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../../src");
const Person_1 = require("./Person");
let Employee = class Employee extends Person_1.Person {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Employee.prototype, "salary", void 0);
Employee = tslib_1.__decorate([
    (0, src_1.ChildEntity)()
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map