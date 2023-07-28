"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "User",
    table: {
        name: "user",
    },
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
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
};
//# sourceMappingURL=UserSchema.js.map