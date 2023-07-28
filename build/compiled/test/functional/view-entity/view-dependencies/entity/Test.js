"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const ViewC_1 = require("./ViewC");
const ViewB_1 = require("./ViewB");
const ViewA_1 = require("./ViewA");
let TestEntity = class TestEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TestEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("varchar"),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => ViewC_1.ViewC),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", ViewC_1.ViewC
    // Bogus relations to mix up import order
    )
], TestEntity.prototype, "somehowMatched", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => ViewB_1.ViewB),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", ViewB_1.ViewB
    // Bogus relations to mix up import order
    )
], TestEntity.prototype, "somehowMatched2", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => ViewA_1.ViewA),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", ViewA_1.ViewA)
], TestEntity.prototype, "somehowMatched3", void 0);
TestEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=Test.js.map