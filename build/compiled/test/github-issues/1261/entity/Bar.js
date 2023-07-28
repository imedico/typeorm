"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const BaseEntity_1 = require("../../../../src/repository/BaseEntity");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const Foo_1 = require("./Foo");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
let Bar = class Bar extends BaseEntity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Bar.prototype, "id", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Foo_1.Foo, {
        onDelete: "SET NULL",
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Foo_1.Foo)
], Bar.prototype, "foo", void 0);
Bar = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Bar);
exports.Bar = Bar;
//# sourceMappingURL=Bar.js.map