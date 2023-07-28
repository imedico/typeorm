"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let TestEntity = class TestEntity {
};
tslib_1.__decorate([
    (0, src_1.ObjectIdColumn)(),
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "testColumn", void 0);
TestEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map