"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Foo.prototype, "uuid", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "citext", nullable: false }),
    tslib_1.__metadata("design:type", String)
], Foo.prototype, "lowercaseval", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "citext", nullable: false }),
    tslib_1.__metadata("design:type", String)
], Foo.prototype, "lowercaseval2", void 0);
Foo = tslib_1.__decorate([
    (0, src_1.Entity)("foo")
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map