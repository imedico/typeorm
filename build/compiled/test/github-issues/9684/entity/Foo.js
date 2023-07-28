"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = exports.EnumStatus = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var EnumStatus;
(function (EnumStatus) {
    EnumStatus["DRAFT"] = "draft";
    EnumStatus["PUBLISHED"] = "published";
})(EnumStatus = exports.EnumStatus || (exports.EnumStatus = {}));
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({ name: "id" }),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: EnumStatus, default: EnumStatus.DRAFT }),
    tslib_1.__metadata("design:type", Date)
], Foo.prototype, "enumStatus", void 0);
Foo = tslib_1.__decorate([
    (0, src_1.Entity)("module-foo_table_x")
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map