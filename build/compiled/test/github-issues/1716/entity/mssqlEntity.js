"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MssqlEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let MssqlEntity = class MssqlEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], MssqlEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("time"),
    tslib_1.__metadata("design:type", Date)
], MssqlEntity.prototype, "fieldTime", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("datetime"),
    tslib_1.__metadata("design:type", Date)
], MssqlEntity.prototype, "fieldDatetime", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("datetime2"),
    tslib_1.__metadata("design:type", Date)
], MssqlEntity.prototype, "fieldDatetime2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("datetimeoffset"),
    tslib_1.__metadata("design:type", Date)
], MssqlEntity.prototype, "fieldDatetimeoffset", void 0);
MssqlEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], MssqlEntity);
exports.MssqlEntity = MssqlEntity;
//# sourceMappingURL=mssqlEntity.js.map