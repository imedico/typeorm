"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("decimal", { default: -0, precision: 3, scale: 1 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "decimalWithDefault", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("decimal", { default: 100, precision: 3 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "noScale", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("decimal", { default: 10, precision: 3, scale: 0 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "zeroScale", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("decimal", { default: 9999999999 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "maxDefault", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("decimal", { default: -9999999999 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "minDefault", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("int", { default: -100 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "intDefault", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("float", { default: 3.5 }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "floatDefault", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: "New user" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "stringDefault", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map