"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreedSchema = void 0;
const src_1 = require("../../../../../../src");
exports.BreedSchema = new src_1.EntitySchema({
    name: "breed",
    columns: {
        id: {
            primary: true,
            type: Number,
            generated: "increment",
        },
    },
});
//# sourceMappingURL=Breed.js.map