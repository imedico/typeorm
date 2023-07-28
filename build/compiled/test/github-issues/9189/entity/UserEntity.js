"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const GroupEntity_1 = require("./GroupEntity");
let UserEntity = class UserEntity {
};
tslib_1.__decorate([
    (0, src_2.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)("GroupEntity", "user"),
    tslib_1.__metadata("design:type", GroupEntity_1.GroupEntity)
], UserEntity.prototype, "group", void 0);
UserEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map