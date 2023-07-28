"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../src/decorator/columns/Column");
const TableInheritance_1 = require("../../../src/decorator/entity/TableInheritance");
const Entity_1 = require("../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../src/decorator/columns/PrimaryColumn");
// todo: some things left to do:
// * check how it works when is join (conditions are not added in the joins right now)
let Person = class Person {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)("int"),
    tslib_1.__metadata("design:type", Number)
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
    (0, Entity_1.Entity)("sample28_person"),
    (0, TableInheritance_1.TableInheritance)({ column: { name: "type", type: "varchar" } })
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map