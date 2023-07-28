"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntitySchema = exports.User = void 0;
const Name_1 = require("./Name");
const src_1 = require("../../../../../../src");
class User {
}
exports.User = User;
exports.UserEntitySchema = new src_1.EntitySchema({
    name: User.name,
    target: User,
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