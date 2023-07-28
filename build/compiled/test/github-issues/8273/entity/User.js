"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "uuid" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "uuid" }),
    (0, src_1.Generated)("uuid"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "uuidWithGenerated", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "increment", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Generated)("increment"),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "incrementWithGenerated", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map