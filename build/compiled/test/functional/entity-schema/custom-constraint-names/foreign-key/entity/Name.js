"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameSchema = void 0;
const src_1 = require("../../../../../../src");
exports.NameSchema = new src_1.EntitySchema({
    name: "name",
    columns: {
        id: {
            primary: true,
            type: Number,
            generated: "increment",
        },
    },
});
//# sourceMappingURL=Name.js.map