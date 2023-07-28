"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let TestEntity = class TestEntity {
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "name", void 0);
TestEntity = tslib_1.__decorate([
    (0, src_1.Entity)("test")
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=test.entity.js.map