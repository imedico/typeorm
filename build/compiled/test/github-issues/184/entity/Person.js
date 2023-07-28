"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = exports.PersonType = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const TableInheritance_1 = require("../../../../src/decorator/entity/TableInheritance");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
var PersonType;
(function (PersonType) {
    PersonType[PersonType["Employee"] = 1] = "Employee";
    PersonType[PersonType["Homesitter"] = 2] = "Homesitter";
    PersonType[PersonType["Student"] = 3] = "Student";
})(PersonType = exports.PersonType || (exports.PersonType = {}));
let Person = class Person {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "lastName", void 0);
Person = tslib_1.__decorate([
    (0, Entity_1.Entity)("issue184_person"),
    (0, TableInheritance_1.TableInheritance)({ column: { name: "type", type: "int" } })
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map