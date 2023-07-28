"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ASchema = void 0;
const src_1 = require("../../../../src");
const entity_1 = require("../entity");
const Base_1 = require("./Base");
exports.ASchema = new src_1.EntitySchema({
    target: entity_1.A,
    name: "A",
    type: "entity-child",
    columns: {
        ...Base_1.BaseSchema.options.columns,
        a: {
            type: Boolean,
        },
    },
});
//# sourceMappingURL=A.js.map