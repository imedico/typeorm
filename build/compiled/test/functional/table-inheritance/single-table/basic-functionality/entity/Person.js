"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const TableInheritance_1 = require("../../../../../../src/decorator/entity/TableInheritance");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
let Person = class Person {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "name", void 0);
Person = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, TableInheritance_1.TableInheritance)({ column: { name: "type", type: String } })
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map