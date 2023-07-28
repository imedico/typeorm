"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiIdMaterialized = exports.MultiIdNested = exports.SingleIdMaterialized = exports.SingleIdNested = exports.SingleIdClosure = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let SingleIdClosure = class SingleIdClosure {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SingleIdClosure.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], SingleIdClosure.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], SingleIdClosure.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)({ onDelete: "CASCADE" }),
    tslib_1.__metadata("design:type", Object)
], SingleIdClosure.prototype, "parent", void 0);
SingleIdClosure = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("closure-table")
], SingleIdClosure);
exports.SingleIdClosure = SingleIdClosure;
let SingleIdNested = class SingleIdNested {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SingleIdNested.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], SingleIdNested.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], SingleIdNested.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)({ onDelete: "CASCADE" }),
    tslib_1.__metadata("design:type", Object)
], SingleIdNested.prototype, "parent", void 0);
SingleIdNested = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("nested-set")
], SingleIdNested);
exports.SingleIdNested = SingleIdNested;
let SingleIdMaterialized = class SingleIdMaterialized {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SingleIdMaterialized.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], SingleIdMaterialized.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], SingleIdMaterialized.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)({ onDelete: "CASCADE" }),
    tslib_1.__metadata("design:type", Object)
], SingleIdMaterialized.prototype, "parent", void 0);
SingleIdMaterialized = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("materialized-path")
], SingleIdMaterialized);
exports.SingleIdMaterialized = SingleIdMaterialized;
let MultiIdNested = class MultiIdNested {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], MultiIdNested.prototype, "column", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], MultiIdNested.prototype, "row", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], MultiIdNested.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], MultiIdNested.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)({ onDelete: "CASCADE" }),
    tslib_1.__metadata("design:type", Object)
], MultiIdNested.prototype, "parent", void 0);
MultiIdNested = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("nested-set")
], MultiIdNested);
exports.MultiIdNested = MultiIdNested;
let MultiIdMaterialized = class MultiIdMaterialized {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], MultiIdMaterialized.prototype, "column", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], MultiIdMaterialized.prototype, "row", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], MultiIdMaterialized.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], MultiIdMaterialized.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)({ onDelete: "CASCADE" }),
    tslib_1.__metadata("design:type", Object)
], MultiIdMaterialized.prototype, "parent", void 0);
MultiIdMaterialized = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("materialized-path")
], MultiIdMaterialized);
exports.MultiIdMaterialized = MultiIdMaterialized;
//# sourceMappingURL=RemainingTreeEntities.js.map