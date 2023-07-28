"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        array: true,
        type: "varchar",
        length: 64,
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Foo.prototype, "varchararray", void 0);
Foo = tslib_1.__decorate([
    (0, src_1.Entity)()
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=foo.js.map