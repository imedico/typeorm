"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameEntitySchema = void 0;
const src_1 = require("../../../../../../src");
exports.NameEntitySchema = new src_1.EntitySchema({
    name: "name",
    columns: {
        first: {
            type: String,
        },
        last: {
            type: String,
        },
    },
    indices: [
        {
            columns: ["first"],
        },
    ],
});
//# sourceMappingURL=Name.js.map