"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Rule_1 = require("./Rule");
let Node = class Node {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({ type: "int" }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Node.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Rule_1.Rule, (rule) => rule.node, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    tslib_1.__metadata("design:type", Array)
], Node.prototype, "rules", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], Node.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)({ cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Node.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "int", nullable: true, name: "parentId" }),
    tslib_1.__metadata("design:type", Number)
], Node.prototype, "parentId", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    (0, src_1.JoinColumn)({
        name: "parentId",
        referencedColumnName: "id",
    }),
    tslib_1.__metadata("design:type", Node)
], Node.prototype, "parent", void 0);
Node = tslib_1.__decorate([
    (0, src_1.Entity)("node"),
    (0, src_1.Tree)("materialized-path")
], Node);
exports.Node = Node;
//# sourceMappingURL=Node.js.map