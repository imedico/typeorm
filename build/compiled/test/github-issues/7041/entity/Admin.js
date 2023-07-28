"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const User_1 = require("./User");
const Organization_1 = require("./Organization");
let Admin = class Admin extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => User_1.User, (user) => user.admin),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], Admin.prototype, "user", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Organization_1.Organization, (org) => org.admin),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Organization_1.Organization)
], Admin.prototype, "organization", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Admin.prototype, "randomField", void 0);
Admin = tslib_1.__decorate([
    (0, src_1.Entity)()
], Admin);
exports.Admin = Admin;
//# sourceMappingURL=Admin.js.map