"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const src_1 = require("../../../../../../src");
exports.CategorySchema = new src_1.EntitySchema({
    name: "category",
    columns: {
        id: {
            primary: true,
            type: Number,
            generated: "increment",
        },
    },
});
//# sourceMappingURL=Category.js.map