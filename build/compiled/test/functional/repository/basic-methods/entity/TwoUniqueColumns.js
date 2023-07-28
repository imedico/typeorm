"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoUniqueColumnsEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let TwoUniqueColumnsEntity = class TwoUniqueColumnsEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], TwoUniqueColumnsEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], TwoUniqueColumnsEntity.prototype, "externalId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], TwoUniqueColumnsEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TwoUniqueColumnsEntity.prototype, "name", void 0);
TwoUniqueColumnsEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], TwoUniqueColumnsEntity);
exports.TwoUniqueColumnsEntity = TwoUniqueColumnsEntity;
//# sourceMappingURL=TwoUniqueColumns.js.map