"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultUpdateDate = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let DefaultUpdateDate = class DefaultUpdateDate {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({
        type: "int",
    }),
    tslib_1.__metadata("design:type", Number)
], DefaultUpdateDate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], DefaultUpdateDate.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], DefaultUpdateDate.prototype, "updatedDate", void 0);
DefaultUpdateDate = tslib_1.__decorate([
    (0, src_1.Entity)()
], DefaultUpdateDate);
exports.DefaultUpdateDate = DefaultUpdateDate;
//# sourceMappingURL=default-update-date.js.map