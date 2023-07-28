"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalSchema = void 0;
const src_1 = require("../../../../../../src");
exports.AnimalSchema = new src_1.EntitySchema({
    name: "animal",
    columns: {
        id: {
            primary: true,
            type: Number,
            generated: "increment",
        },
    },
    relations: {
        categories: {
            type: "many-to-many",
            target: "category",
            joinTable: {
                name: "animal_category",
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
            },
        },
        breed: {
            type: "many-to-one",
            target: "breed",
            joinColumn: {
                name: "breedId",
                referencedColumnName: "id",
                foreignKeyConstraintName: "fk_animal_breedId",
            },
        },
        name: {
            type: "one-to-one",
            target: "name",
            joinColumn: {
                name: "nameId",
                referencedColumnName: "id",
                foreignKeyConstraintName: "fk_animal_nameId",
            },
        },
    },
});
//# sourceMappingURL=Animal.js.map