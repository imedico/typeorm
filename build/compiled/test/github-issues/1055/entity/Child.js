"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Child = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Parent_1 = require("./Parent");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
let Child = class Child {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Child.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Child.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((target) => Parent_1.Parent, (parent) => parent.children, { lazy: true }),
    tslib_1.__metadata("design:type", Object)
], Child.prototype, "parent", void 0);
Child = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Child);
exports.Child = Child;
//# sourceMappingURL=Child.js.map