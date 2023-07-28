"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntity = void 0;
const src_1 = require("../../../../../src");
exports.CategoryEntity = new src_1.EntitySchema({
    name: "category",
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        name: {
            type: String,
        },
    },
});
//# sourceMappingURL=CategoryEntity.js.map