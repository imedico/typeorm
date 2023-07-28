"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const src_1 = require("../../../../../src");
const Foo_1 = require("./Foo");
let Bar = class Bar {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Bar.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Foo_1.Foo),
    tslib_1.__metadata("design:type", Foo_1.Foo)
], Bar.prototype, "foo", void 0);
Bar = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Bar);
exports.Bar = Bar;
//# sourceMappingURL=Bar.js.map