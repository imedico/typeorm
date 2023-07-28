"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Foo_1 = require("./Foo");
let Bar = class Bar {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Bar.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Foo_1.Foo, {
        cascade: true,
        onDelete: "CASCADE",
        nullable: false,
    }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Foo_1.Foo)
], Bar.prototype, "foo", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Bar.prototype, "data", void 0);
Bar = tslib_1.__decorate([
    (0, src_1.Entity)()
], Bar);
exports.Bar = Bar;
//# sourceMappingURL=Bar.js.map