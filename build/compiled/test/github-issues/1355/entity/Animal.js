"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Category_1 = require("./Category");
const Breed_1 = require("./Breed");
let Animal = class Animal {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Animal.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Animal.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Category_1.Category, { eager: true }),
    (0, src_1.JoinTable)({
        joinColumn: {
            name: "categoryId",
            referencedColumnName: "id",
            foreignKeyConstraintName: "fk_animal_category_categoryId",
        },
        inverseJoinColumn: {
            name: "animalId",
            referencedColumnName: "id",
            foreignKeyConstraintName: "fk_animal_category_animalId",
        },
    }),
    tslib_1.__metadata("design:type", Array)
], Animal.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Breed_1.Breed),
    (0, src_1.JoinColumn)({
        name: "breedId",
        referencedColumnName: "id",
        foreignKeyConstraintName: "fk_animal_breedId",
    }),
    tslib_1.__metadata("design:type", Breed_1.Breed)
], Animal.prototype, "breed", void 0);
Animal = tslib_1.__decorate([
    (0, src_1.Entity)()
], Animal);
exports.Animal = Animal;
//# sourceMappingURL=Animal.js.map