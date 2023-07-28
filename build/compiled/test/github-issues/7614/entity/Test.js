"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var ExternalUserProvider;
(function (ExternalUserProvider) {
    ExternalUserProvider["A"] = "A";
    ExternalUserProvider["B"] = "B";
    ExternalUserProvider["C"] = "C";
})(ExternalUserProvider || (ExternalUserProvider = {}));
let TestEntity = class TestEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({
        name: "provider",
        type: "enum",
        enumName: "external_user_provider",
        enum: ExternalUserProvider,
    }),
    (0, src_1.Index)(),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enumName: "external_user_provider",
        enum: ExternalUserProvider,
        array: true,
    }),
    tslib_1.__metadata("design:type", String)
], TestEntity.prototype, "provider2", void 0);
TestEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], TestEntity);
exports.TestEntity = TestEntity;
//# sourceMappingURL=Test.js.map