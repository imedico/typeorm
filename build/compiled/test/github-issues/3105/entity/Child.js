"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Child = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Parent_1 = require("./Parent");
let Child = class Child {
    constructor(_data) {
        this.data = _data;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({
        name: "id",
        type: "int",
    }),
    tslib_1.__metadata("design:type", Number)
], Child.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        name: "parent_id",
        type: "int",
    }),
    tslib_1.__metadata("design:type", Number)
], Child.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Parent_1.Parent, (parent) => parent.children),
    (0, src_1.JoinColumn)({
        name: "parent_id",
        referencedColumnName: "id",
    }),
    tslib_1.__metadata("design:type", Parent_1.Parent)
], Child.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        name: "data",
        type: "int",
    }),
    tslib_1.__metadata("design:type", Number)
], Child.prototype, "data", void 0);
Child = tslib_1.__decorate([
    (0, src_1.Entity)("test_child"),
    tslib_1.__metadata("design:paramtypes", [Number])
], Child);
exports.Child = Child;
//# sourceMappingURL=Child.js.map