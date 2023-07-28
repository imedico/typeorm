"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Category_1 = require("./Category");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
let Animal = class Animal {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Animal.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Animal.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)(() => Category_1.Category),
    tslib_1.__metadata("design:type", Category_1.Category)
], Animal.prototype, "category", void 0);
Animal = tslib_1.__decorate([
    (0, index_1.Entity)()
], Animal);
exports.Animal = Animal;
//# sourceMappingURL=Animal.js.map