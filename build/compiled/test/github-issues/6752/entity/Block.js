"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const PlanOfRecord_1 = require("./PlanOfRecord");
let Block = class Block {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Block.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "chip_name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "manual", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "block", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "frequency", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Block.prototype, "mode", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => PlanOfRecord_1.PlanOfRecord, (por) => por.block),
    tslib_1.__metadata("design:type", Array)
], Block.prototype, "plan_of_records", void 0);
Block = tslib_1.__decorate([
    (0, src_1.Entity)({ synchronize: true }),
    (0, src_1.Index)(["chip_name", "manual", "frequency", "mode"], { unique: true })
], Block);
exports.Block = Block;
//# sourceMappingURL=Block.js.map