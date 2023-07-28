"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanOfRecord = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Block_1 = require("./Block");
let PlanOfRecord = class PlanOfRecord {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PlanOfRecord.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], PlanOfRecord.prototype, "module", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "int" }),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", Number)
], PlanOfRecord.prototype, "module_sku", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], PlanOfRecord.prototype, "softwareComponent", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", Boolean)
], PlanOfRecord.prototype, "isSafety", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], PlanOfRecord.prototype, "planOfRecord", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], PlanOfRecord.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], PlanOfRecord.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Block_1.Block, (block) => block.plan_of_records),
    tslib_1.__metadata("design:type", Block_1.Block)
], PlanOfRecord.prototype, "block", void 0);
PlanOfRecord = tslib_1.__decorate([
    (0, src_1.Entity)({ synchronize: true }),
    (0, src_1.Index)(["block", "softwareComponent", "module", "module_sku ", "isSafety"], {
        unique: true,
    }),
    (0, src_1.Unique)(["block", "softwareComponent", "module", "module_sku ", "isSafety"]),
    (0, src_1.Check)(`"planOfRecord" IN ('NOT_POR', 'POR_BUT_PROD_VAL', 'POR_BUT_RESET_VAL')`)
], PlanOfRecord);
exports.PlanOfRecord = PlanOfRecord;
//# sourceMappingURL=PlanOfRecord.js.map