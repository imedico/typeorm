"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const Category_1 = require("./Category");
const JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
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
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, { eager: true }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Animal.prototype, "categories", void 0);
Animal = tslib_1.__decorate([
    (0, index_1.Entity)()
], Animal);
exports.Animal = Animal;
//# sourceMappingURL=Animal.js.map