"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
let GroupEntity = class GroupEntity {
};
tslib_1.__decorate([
    (0, src_2.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], GroupEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)("UserEntity", "group", { onDelete: "RESTRICT" }),
    tslib_1.__metadata("design:type", Function)
], GroupEntity.prototype, "user", void 0);
GroupEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], GroupEntity);
exports.GroupEntity = GroupEntity;
//# sourceMappingURL=GroupEntity.js.map