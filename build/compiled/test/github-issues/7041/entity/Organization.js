"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Admin_1 = require("./Admin");
const OrganizationMembership_1 = require("./OrganizationMembership");
let Organization = class Organization extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Admin_1.Admin, (admin) => admin.organization, { nullable: true }),
    tslib_1.__metadata("design:type", Admin_1.Admin)
], Organization.prototype, "admin", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "randomField", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => OrganizationMembership_1.OrganizationMembership, (membership) => membership.organization),
    tslib_1.__metadata("design:type", Array)
], Organization.prototype, "membership", void 0);
Organization = tslib_1.__decorate([
    (0, src_1.Entity)()
], Organization);
exports.Organization = Organization;
//# sourceMappingURL=Organization.js.map