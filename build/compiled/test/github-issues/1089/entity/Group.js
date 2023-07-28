"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Group = class Group extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Group.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", String)
], Group.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Group)
], Group.prototype, "children", void 0);
tslib_1.__decorate([
    (0, src_1.TreeParent)(),
    tslib_1.__metadata("design:type", Group)
], Group.prototype, "parent", void 0);
Group = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Tree)("closure-table")
], Group);
exports.Group = Group;
//# sourceMappingURL=Group.js.map