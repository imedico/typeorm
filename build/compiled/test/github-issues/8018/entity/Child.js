"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Child = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Grandchild_1 = require("./Grandchild");
const Parent_1 = require("./Parent");
let Child = class Child {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Child.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Child.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Parent_1.Parent, (parent) => parent.children),
    tslib_1.__metadata("design:type", Parent_1.Parent)
], Child.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Grandchild_1.Grandchild, (grandchild) => grandchild.parent),
    tslib_1.__metadata("design:type", Array)
], Child.prototype, "children", void 0);
Child = tslib_1.__decorate([
    (0, src_1.Entity)()
], Child);
exports.Child = Child;
//# sourceMappingURL=Child.js.map