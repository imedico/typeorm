"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameEntitySchema = exports.Name = void 0;
const src_1 = require("../../../../../../src");
class Name {
}
exports.Name = Name;
exports.NameEntitySchema = new src_1.EntitySchema({
    name: "name",
    target: Name,
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