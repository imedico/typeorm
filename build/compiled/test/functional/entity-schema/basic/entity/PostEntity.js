"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = void 0;
const src_1 = require("../../../../../src");
exports.PostEntity = new src_1.EntitySchema({
    name: "post",
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        title: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    relations: {
        categories: {
            type: "many-to-many",
            target: "category",
            joinTable: true,
        },
    },
});
//# sourceMappingURL=PostEntity.js.map