"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const src_1 = require("../../../../../src");
exports.UserEntity = new src_1.EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {
            type: Number,
            primary: true,
        },
        firstName: {
            type: String,
            nullable: false,
        },
        secondName: {
            type: String,
            nullable: false,
        },
    },
});
//# sourceMappingURL=UserEntity.js.map