"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("identity", { generatedIdentity: "ALWAYS" }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "bigint",
        generated: "identity",
        generatedIdentity: "ALWAYS",
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "secondId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "int",
        generated: "identity",
        generatedIdentity: "BY DEFAULT",
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "thirdId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "int", generated: "identity" }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "fourthId", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=UserEntity.js.map