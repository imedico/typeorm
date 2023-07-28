"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSchema = void 0;
const src_1 = require("../../../../src");
const entity_1 = require("../entity");
exports.BaseSchema = new src_1.EntitySchema({
    target: entity_1.Base,
    name: "Base",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: "increment",
        },
        type: {
            type: String,
        },
        createdAt: {
            type: Date,
            createDate: true,
        },
        updatedAt: {
            type: Date,
            updateDate: true,
        },
    },
    inheritance: {
        pattern: "STI",
        column: "type",
    },
});
//# sourceMappingURL=Base.js.map