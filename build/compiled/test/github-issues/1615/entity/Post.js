"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FooEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let FooEntity = class FooEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], FooEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("datetime2", { precision: 0 }),
    tslib_1.__metadata("design:type", Date)
], FooEntity.prototype, "date", void 0);
FooEntity = tslib_1.__decorate([
    (0, src_1.Entity)("Foo")
], FooEntity);
exports.FooEntity = FooEntity;
//# sourceMappingURL=Post.js.map