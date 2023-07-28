"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToOrganizationEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const UserEntity_1 = require("./UserEntity");
const OrganizationEntity_1 = require("./OrganizationEntity");
let UserToOrganizationEntity = class UserToOrganizationEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserToOrganizationEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enum: ["owner", "editor", "viewer"],
    }),
    tslib_1.__metadata("design:type", String)
], UserToOrganizationEntity.prototype, "role", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => UserEntity_1.UserEntity, (user) => user.organizations),
    tslib_1.__metadata("design:type", UserEntity_1.UserEntity)
], UserToOrganizationEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => OrganizationEntity_1.OrganizationEntity, (organization) => organization.users),
    tslib_1.__metadata("design:type", OrganizationEntity_1.OrganizationEntity)
], UserToOrganizationEntity.prototype, "organization", void 0);
UserToOrganizationEntity = tslib_1.__decorate([
    (0, src_1.Entity)("user_organization")
], UserToOrganizationEntity);
exports.UserToOrganizationEntity = UserToOrganizationEntity;
//# sourceMappingURL=UserToOrganizationEntity.js.map