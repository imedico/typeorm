"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const FooMetadata_1 = require("./FooMetadata");
let Foo = class Foo {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Foo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Foo.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => FooMetadata_1.FooMetadata),
    tslib_1.__metadata("design:type", FooMetadata_1.FooMetadata)
], Foo.prototype, "metadata", void 0);
Foo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Foo);
exports.Foo = Foo;
//# sourceMappingURL=Foo.js.map