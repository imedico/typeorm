"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
let Person = class Person {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Person.prototype, "Id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Person.prototype, "Name", void 0);
Person = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Person);
exports.Person = Person;
//# sourceMappingURL=Person.js.map