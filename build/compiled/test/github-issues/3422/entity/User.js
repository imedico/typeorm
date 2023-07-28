"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Tree_1 = require("../../../../src/decorator/tree/Tree");
const TreeChildren_1 = require("../../../../src/decorator/tree/TreeChildren");
const TreeParent_1 = require("../../../../src/decorator/tree/TreeParent");
let User = class User {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, TreeParent_1.TreeParent)(),
    tslib_1.__metadata("design:type", User)
], User.prototype, "manager", void 0);
tslib_1.__decorate([
    (0, TreeChildren_1.TreeChildren)(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "managerOf", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)({ name: "users", schema: "admin" }),
    (0, Tree_1.Tree)("nested-set")
], User);
exports.User = User;
//# sourceMappingURL=User.js.map