"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Index_1 = require("../../../../src/decorator/Index");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, Column_1.Column)("date"),
    (0, Index_1.Index)({ expireAfterSeconds: 0 }),
    tslib_1.__metadata("design:type", Date)
], Foo.prototype, "expireAt", void 0);
Foo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map