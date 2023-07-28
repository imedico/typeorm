"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooMetadata = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const FooChildMetadata_1 = require("./FooChildMetadata");
class FooMetadata {
}
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], FooMetadata.prototype, "bar", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => FooChildMetadata_1.FooChildMetadata),
    tslib_1.__metadata("design:type", FooChildMetadata_1.FooChildMetadata)
], FooMetadata.prototype, "child", void 0);
exports.FooMetadata = FooMetadata;
//# sourceMappingURL=FooMetadata.js.map