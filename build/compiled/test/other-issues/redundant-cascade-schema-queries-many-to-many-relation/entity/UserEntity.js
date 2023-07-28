"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const src_1 = require("../../../../src");
exports.UserEntity = new src_1.EntitySchema({
    name: "user",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment",
        },
    },
    relations: {
        teams: {
            type: "many-to-many",
            target: "team",
            inverseSide: "users",
        },
    },
});
//# sourceMappingURL=UserEntity.js.map