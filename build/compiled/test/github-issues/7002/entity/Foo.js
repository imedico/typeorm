"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Bar_1 = require("./Bar");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Foo.prototype, "text", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "barId", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Bar_1.Bar, (b) => b.foo),
    (0, src_1.JoinColumn)({ name: "id", referencedColumnName: "id" }),
    tslib_1.__metadata("design:type", Bar_1.Bar)
], Foo.prototype, "bar", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Foo.prototype, "d", void 0);
Foo = tslib_1.__decorate([
    (0, src_1.Entity)()
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map