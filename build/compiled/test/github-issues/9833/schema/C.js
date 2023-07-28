"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSchema = void 0;
const src_1 = require("../../../../src");
const entity_1 = require("../entity");
const Base_1 = require("./Base");
exports.CSchema = new src_1.EntitySchema({
    target: entity_1.C,
    name: "C",
    type: "entity-child",
    columns: {
        ...Base_1.BaseSchema.options.columns,
        c: {
            type: String,
        },
    },
});
//# sourceMappingURL=C.js.map