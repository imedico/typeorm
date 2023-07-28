"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const ChildEntity_1 = require("./ChildEntity");
let ParentEntity = class ParentEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    tslib_1.__metadata("design:type", String)
], ParentEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => ChildEntity_1.ChildEntity, { nullable: true }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Object)
], ParentEntity.prototype, "child", void 0);
tslib_1.__decorate([
    (0, src_1.RelationId)((parent) => parent.child),
    tslib_1.__metadata("design:type", Object)
], ParentEntity.prototype, "childId", void 0);
ParentEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], ParentEntity);
exports.ParentEntity = ParentEntity;
//# sourceMappingURL=ParentEntity.js.map