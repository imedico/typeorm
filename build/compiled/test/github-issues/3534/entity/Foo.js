"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const RegExpStringTransformer_1 = require("./RegExpStringTransformer");
const src_1 = require("../../../../src");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: String, transformer: RegExpStringTransformer_1.RegExpStringTransformer }),
    tslib_1.__metadata("design:type", RegExp)
], Foo.prototype, "bar", void 0);
Foo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map