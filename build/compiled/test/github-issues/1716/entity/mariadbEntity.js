"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MariadbEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let MariadbEntity = class MariadbEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], MariadbEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("time"),
    tslib_1.__metadata("design:type", Date)
], MariadbEntity.prototype, "fieldTime", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("timestamp"),
    tslib_1.__metadata("design:type", Date)
], MariadbEntity.prototype, "fieldTimestamp", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("datetime"),
    tslib_1.__metadata("design:type", Date)
], MariadbEntity.prototype, "fieldDatetime", void 0);
MariadbEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], MariadbEntity);
exports.MariadbEntity = MariadbEntity;
//# sourceMappingURL=mariadbEntity.js.map