"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({ name: "id" }),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ name: "updated_at" }),
    tslib_1.__metadata("design:type", Date)
], Foo.prototype, "updatedAt", void 0);
Foo = tslib_1.__decorate([
    (0, src_1.Entity)({ name: "foo", schema: "SYSTEM" })
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map