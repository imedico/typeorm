"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Foo_1 = require("./Foo");
let Bar = class Bar extends src_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Bar.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Bar.prototype, "description", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)((type) => Foo_1.Foo, (foo) => foo.bars),
    tslib_1.__metadata("design:type", Array)
], Bar.prototype, "foos", void 0);
Bar = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Bar);
exports.Bar = Bar;
//# sourceMappingURL=Bar.js.map