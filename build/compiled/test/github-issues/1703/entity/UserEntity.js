"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const UserToOrganizationEntity_1 = require("./UserToOrganizationEntity");
let UserEntity = class UserEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => UserToOrganizationEntity_1.UserToOrganizationEntity, (userToOrganization) => userToOrganization.user),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "organizations", void 0);
UserEntity = tslib_1.__decorate([
    (0, src_1.Entity)("user")
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map