"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const src_1 = require("../../../../../../src");
exports.UserSchema = new src_1.EntitySchema({
    name: "user",
    columns: {
        name: {
            primary: true,
            type: String,
            primaryKeyConstraintName: "PK_ID",
        },
    },
});
//# sourceMappingURL=User.js.map