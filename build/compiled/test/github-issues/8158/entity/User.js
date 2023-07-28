"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const UserMeta_1 = require("./UserMeta");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "lastName", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "age", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: false }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "userMetaId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => UserMeta_1.UserMeta),
    (0, src_1.JoinColumn)({ name: "userMetaId", referencedColumnName: "id" }),
    tslib_1.__metadata("design:type", UserMeta_1.UserMeta)
], User.prototype, "userMeta", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.Unique)(["firstName"]),
    (0, src_1.Unique)(["id", "firstName"])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map