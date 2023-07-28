"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationMaterialized = exports.RelationNested = exports.RelationClosure = exports.OtherRelation = exports.Relation = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Relation = class Relation {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Relation.prototype, "id", void 0);
Relation = tslib_1.__decorate([
    (0, src_1.Entity)()
], Relation);
exports.Relation = Relation;
let OtherRelation = class OtherRelation {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], OtherRelation.prototype, "id", void 0);
OtherRelation = tslib_1.__decorate([
    (0, src_1.Entity)()
], OtherRelation);
exports.OtherRelation = OtherRelation;
let RelationClosure = class RelationClosure {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RelationClosure.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], RelationClosure.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    tslib_1.__metadata("design:type", RelationClosure)
], RelationClosure.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Relation, { nullable: false }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Relation)
], RelationClosure.prototype, "relation", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => OtherRelation, { cascade: true }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", OtherRelation)
], RelationClosure.prototype, "otherRelation", void 0);
RelationClosure = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("closure-table")
], RelationClosure);
exports.RelationClosure = RelationClosure;
let RelationNested = class RelationNested {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RelationNested.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], RelationNested.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    tslib_1.__metadata("design:type", RelationNested)
], RelationNested.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Relation, { nullable: false }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Relation)
], RelationNested.prototype, "relation", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => OtherRelation, { cascade: true }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", OtherRelation)
], RelationNested.prototype, "otherRelation", void 0);
RelationNested = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("nested-set")
], RelationNested);
exports.RelationNested = RelationNested;
let RelationMaterialized = class RelationMaterialized {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], RelationMaterialized.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], RelationMaterialized.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    tslib_1.__metadata("design:type", RelationMaterialized)
], RelationMaterialized.prototype, "parent", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Relation, { nullable: false }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Relation)
], RelationMaterialized.prototype, "relation", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => OtherRelation, { cascade: true }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", OtherRelation)
], RelationMaterialized.prototype, "otherRelation", void 0);
RelationMaterialized = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("materialized-path")
], RelationMaterialized);
exports.RelationMaterialized = RelationMaterialized;
//# sourceMappingURL=RelationEntities.js.map