"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Bar_1 = require("./Bar");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let Foo = class Foo extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.JoinTable)(),
    (0, src_1.ManyToMany)(() => Bar_1.Bar, (bar) => bar.foos, {
        cascade: ["insert", "update"],
        onDelete: "NO ACTION",
    }),
    tslib_1.__metadata("design:type", Array)
], Foo.prototype, "bars", void 0);
tslib_1.__decorate([
    (0, src_1.JoinTable)(),
    (0, src_1.ManyToMany)(() => Bar_1.Bar, (bar) => bar.foos, {
        cascade: ["insert", "update"],
    }),
    tslib_1.__metadata("design:type", Array)
], Foo.prototype, "otherBars", void 0);
Foo = tslib_1.__decorate([
    (0, Entity_1.Entity)("foo")
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map