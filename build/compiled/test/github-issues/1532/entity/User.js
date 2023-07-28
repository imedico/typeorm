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
    (0, src_1.Column)({ type: "varchar", array: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "array", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "varchar", array: true, nullable: false }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "nonNullArray", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "varchar", array: true, nullable: false, default: [] }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "emptyArrayDefault", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "varchar",
        array: true,
        nullable: false,
        default: ["a", "b", "c"],
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "filledArrayDefault", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "varchar", array: true, nullable: false, default: "{}" }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "emptyArrayDefaultString", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "varchar",
        array: true,
        nullable: false,
        default: "{a,b,c}",
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "filledArrayDefaultString", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map