"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntitySchema = void 0;
const Name_1 = require("./Name");
const src_1 = require("../../../../../../src");
exports.UserEntitySchema = new src_1.EntitySchema({
    name: "user",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        isActive: {
            type: Boolean,
        },
    },
    embeddeds: {
        name: {
            schema: Name_1.NameEntitySchema,
            prefix: "name_",
        },
    },
});
//# sourceMappingURL=User.js.map