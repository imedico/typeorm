"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Index_1 = require("../../../../src/decorator/Index");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Person = class Person {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Index_1.Index)({
        unique: true,
    }),
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "firstname", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "lastname", void 0);
Person = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=person.js.map