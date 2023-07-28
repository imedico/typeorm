"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Admin_1 = require("./Admin");
const OrganizationMembership_1 = require("./OrganizationMembership");
let User = class User extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "randomField", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Admin_1.Admin, (admin) => admin.user, { nullable: true }),
    tslib_1.__metadata("design:type", Admin_1.Admin)
], User.prototype, "admin", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => OrganizationMembership_1.OrganizationMembership, (membership) => membership.user, {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "membership", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map