"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cat = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const Dog_1 = require("./Dog");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
let Cat = class Cat {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Cat.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Dog_1.Dog, (dog) => dog.cats),
    tslib_1.__metadata("design:type", Dog_1.Dog)
], Cat.prototype, "dog", void 0);
Cat = tslib_1.__decorate([
    (0, index_1.Entity)()
], Cat);
exports.Cat = Cat;
//# sourceMappingURL=Cat.js.map