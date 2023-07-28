"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PgEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let PgEntity = class PgEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PgEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("time"),
    tslib_1.__metadata("design:type", Date)
], PgEntity.prototype, "fieldTime", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("time with time zone"),
    tslib_1.__metadata("design:type", Date)
], PgEntity.prototype, "fieldTimeWithTZ", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("time without time zone"),
    tslib_1.__metadata("design:type", Date)
], PgEntity.prototype, "fieldTimeWithoutTZ", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp"),
    tslib_1.__metadata("design:type", Date)
], PgEntity.prototype, "fieldTimestamp", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp without time zone"),
    tslib_1.__metadata("design:type", Date)
], PgEntity.prototype, "fieldTimestampWithoutTZ", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp with time zone"),
    tslib_1.__metadata("design:type", Date)
], PgEntity.prototype, "fieldTimestampWithTZ", void 0);
PgEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], PgEntity);
exports.PgEntity = PgEntity;
//# sourceMappingURL=pgEntity.js.map