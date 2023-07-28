"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamEntity = void 0;
const src_1 = require("../../../../src");
exports.TeamEntity = new src_1.EntitySchema({
    name: "team",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: "increment",
        },
    },
    relations: {
        users: {
            type: "many-to-many",
            target: "user",
            joinTable: { name: "user_team" },
            inverseSide: "teams",
        },
    },
});
//# sourceMappingURL=TeamEntity.js.map