"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const src_1 = require("../../../../../../src");
exports.PostSchema = new src_1.EntitySchema({
    name: "post",
    columns: {
        name: {
            primary: true,
            type: String,
            primaryKeyConstraintName: "PK_NAME_HEADER",
        },
        header: {
            primary: true,
            type: String,
            primaryKeyConstraintName: "PK_NAME_HEADER",
        },
    },
});
//# sourceMappingURL=Post.js.map