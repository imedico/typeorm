"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Foo = class Foo extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        nullable: false,
        type: "varchar",
        default: () => "concat(chr(65), 'FMU000')",
    }),
    tslib_1.__metadata("design:type", String)
], Foo.prototype, "displayId", void 0);
Foo = tslib_1.__decorate([
    (0, src_1.Entity)("foo_test")
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=foo.entity.js.map