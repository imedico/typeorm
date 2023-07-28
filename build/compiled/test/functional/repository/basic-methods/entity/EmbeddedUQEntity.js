"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbeddedUQEntity = exports.EmbeddedEntityWithUniqueColumn = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
class EmbeddedEntityWithUniqueColumn {
}
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], EmbeddedEntityWithUniqueColumn.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], EmbeddedEntityWithUniqueColumn.prototype, "value", void 0);
exports.EmbeddedEntityWithUniqueColumn = EmbeddedEntityWithUniqueColumn;
let EmbeddedUQEntity = class EmbeddedUQEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], EmbeddedUQEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(() => EmbeddedEntityWithUniqueColumn),
    tslib_1.__metadata("design:type", EmbeddedEntityWithUniqueColumn)
], EmbeddedUQEntity.prototype, "embedded", void 0);
EmbeddedUQEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], EmbeddedUQEntity);
exports.EmbeddedUQEntity = EmbeddedUQEntity;
//# sourceMappingURL=EmbeddedUQEntity.js.map