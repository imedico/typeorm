"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationMembership = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
const Organization_1 = require("./Organization");
let OrganizationMembership = class OrganizationMembership extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], OrganizationMembership.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], OrganizationMembership.prototype, "organizationId", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => User_1.User, (user) => user.membership),
    tslib_1.__metadata("design:type", User_1.User)
], OrganizationMembership.prototype, "user", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Organization_1.Organization, (organization) => organization.membership),
    tslib_1.__metadata("design:type", Organization_1.Organization)
], OrganizationMembership.prototype, "organization", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], OrganizationMembership.prototype, "accessLevel", void 0);
OrganizationMembership = tslib_1.__decorate([
    (0, src_1.Entity)()
], OrganizationMembership);
exports.OrganizationMembership = OrganizationMembership;
//# sourceMappingURL=OrganizationMembership.js.map