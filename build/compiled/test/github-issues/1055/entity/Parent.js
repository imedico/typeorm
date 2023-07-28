"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parent = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Child_1 = require("./Child");
const OneToMany_1 = require("../../../../src/decorator/relations/OneToMany");
let Parent = class Parent {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Parent.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Parent.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((target) => Child_1.Child, (child) => child.parent, { lazy: true }),
    tslib_1.__metadata("design:type", Promise)
], Parent.prototype, "children", void 0);
Parent = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Parent);
exports.Parent = Parent;
//# sourceMappingURL=Parent.js.map