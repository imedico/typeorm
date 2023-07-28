"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const src_1 = require("../../../../../src");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id1", void 0);
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id2", void 0);
Foo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map