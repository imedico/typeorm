"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Person_1 = require("./Person");
const ChildEntity_1 = require("../../../../src/decorator/entity/ChildEntity");
let Employee = class Employee extends Person_1.Person {
    constructor() {
        super();
        this.type = 1;
    }
};
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Employee.prototype, "salary", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Employee.prototype, "shared", void 0);
Employee = tslib_1.__decorate([
    (0, ChildEntity_1.ChildEntity)(Person_1.PersonType.Employee),
    tslib_1.__metadata("design:paramtypes", [])
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map