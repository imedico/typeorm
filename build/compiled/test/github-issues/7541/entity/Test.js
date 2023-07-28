"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var StandardSetType;
(function (StandardSetType) {
    StandardSetType["AcademicStandard"] = "AcademicStandard";
    StandardSetType["FoundationalKnowledge"] = "FoundationalKnowledge";
    StandardSetType["AchievementDescriptor"] = "AchievementDescriptor";
})(StandardSetType || (StandardSetType = {}));
let TestEntity = class TestEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("enum", { enum: StandardSetType, name: "type" }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: StandardSetType }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "type2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("enum", { enum: StandardSetType, enumName: "StandardSetType" }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "type3", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enumName: "StandardSetType" }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "type4", void 0);
TestEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=Test.js.map