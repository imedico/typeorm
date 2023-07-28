"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "nickname", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "age", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Unique)(["age"]),
    (0, src_1.Unique)("unique-email", ["email"]),
    (0, src_1.Unique)("unique-email-nickname", ["email", "nickname"])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map