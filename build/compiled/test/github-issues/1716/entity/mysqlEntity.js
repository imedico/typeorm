"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let MysqlEntity = class MysqlEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], MysqlEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("time"),
    tslib_1.__metadata("design:type", Date)
], MysqlEntity.prototype, "fieldTime", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp"),
    tslib_1.__metadata("design:type", Date)
], MysqlEntity.prototype, "fieldTimestamp", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("datetime"),
    tslib_1.__metadata("design:type", Date)
], MysqlEntity.prototype, "fieldDatetime", void 0);
MysqlEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], MysqlEntity);
exports.MysqlEntity = MysqlEntity;
//# sourceMappingURL=mysqlEntity.js.map