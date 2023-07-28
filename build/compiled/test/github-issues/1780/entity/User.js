"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Index_1 = require("../../../../src/decorator/Index");
let User = class User {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ length: 100 }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ length: 100 }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ length: 100 }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "is_updated", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)("unique_idx", ["first_name", "last_name"], { unique: true })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map