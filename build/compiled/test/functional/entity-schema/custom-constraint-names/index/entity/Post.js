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
        header: {
            type: String,
        },
    },
    indices: [
        {
            name: "IDX_NAME",
            columns: ["name"],
        },
        {
            name: "IDX_HEADER",
            columns: ["header"],
        },
    ],
});
//# sourceMappingURL=Post.js.map