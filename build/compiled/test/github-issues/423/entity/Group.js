"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Index_1 = require("../../../../src/decorator/Index");
let Group = class Group {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Group.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Group.prototype, "name", void 0);
Group = tslib_1.__decorate([
    (0, Index_1.Index)("Groups name", ["name"], { unique: true }),
    (0, Entity_1.Entity)("groups")
], Group);
exports.Group = Group;
//# sourceMappingURL=Group.js.map