"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BSchema = void 0;
const src_1 = require("../../../../src");
const entity_1 = require("../entity");
const Base_1 = require("./Base");
exports.BSchema = new src_1.EntitySchema({
    target: entity_1.B,
    name: "B",
    type: "entity-child",
    columns: {
        ...Base_1.BaseSchema.options.columns,
        b: {
            type: Number,
        },
    },
});
//# sourceMappingURL=B.js.map