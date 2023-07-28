"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ type: "varbinary", length: 16 }),
    tslib_1.__metadata("design:type", Buffer)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Foo.prototype, "name", void 0);
Foo = tslib_1.__decorate([
    (0, src_1.Entity)()
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map