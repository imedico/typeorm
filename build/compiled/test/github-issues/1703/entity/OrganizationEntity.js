"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const UserToOrganizationEntity_1 = require("./UserToOrganizationEntity");
let OrganizationEntity = class OrganizationEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], OrganizationEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => UserToOrganizationEntity_1.UserToOrganizationEntity, (userToOrganization) => userToOrganization.organization),
    tslib_1.__metadata("design:type", Array)
], OrganizationEntity.prototype, "users", void 0);
OrganizationEntity = tslib_1.__decorate([
    (0, src_1.Entity)("organizations")
], OrganizationEntity);
exports.OrganizationEntity = OrganizationEntity;
//# sourceMappingURL=OrganizationEntity.js.map