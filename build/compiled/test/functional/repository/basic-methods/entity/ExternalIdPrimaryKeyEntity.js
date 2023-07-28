"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalIdPrimaryKeyEntity = exports.EmbeddedEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
class EmbeddedEntity {
}
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], EmbeddedEntity.prototype, "foo", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], EmbeddedEntity.prototype, "bar", void 0);
exports.EmbeddedEntity = EmbeddedEntity;
let ExternalIdPrimaryKeyEntity = class ExternalIdPrimaryKeyEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], ExternalIdPrimaryKeyEntity.prototype, "externalId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ExternalIdPrimaryKeyEntity.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(() => EmbeddedEntity),
    tslib_1.__metadata("design:type", EmbeddedEntity)
], ExternalIdPrimaryKeyEntity.prototype, "embedded", void 0);
ExternalIdPrimaryKeyEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], ExternalIdPrimaryKeyEntity);
exports.ExternalIdPrimaryKeyEntity = ExternalIdPrimaryKeyEntity;
//# sourceMappingURL=ExternalIdPrimaryKeyEntity.js.map