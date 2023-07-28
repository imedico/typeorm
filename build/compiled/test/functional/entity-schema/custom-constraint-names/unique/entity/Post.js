"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const src_1 = require("../../../../../../src");
exports.PostSchema = new src_1.EntitySchema({
    name: "post",
    columns: {
        id: {
            primary: true,
            type: Number,
            generated: "increment",
        },
        name: {
            type: String,
        },
    },
    uniques: [
        {
            name: "UQ_NAME",
            columns: ["name"],
        },
    ],
});
//# sourceMappingURL=Post.js.map