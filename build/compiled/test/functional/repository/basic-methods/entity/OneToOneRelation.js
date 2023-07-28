"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneToOneRelationEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Category_1 = require("./Category");
let OneToOneRelationEntity = class OneToOneRelationEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], OneToOneRelationEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Category_1.Category),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Category_1.Category)
], OneToOneRelationEntity.prototype, "category", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], OneToOneRelationEntity.prototype, "order", void 0);
OneToOneRelationEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], OneToOneRelationEntity);
exports.OneToOneRelationEntity = OneToOneRelationEntity;
//# sourceMappingURL=OneToOneRelation.js.map