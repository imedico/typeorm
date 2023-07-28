"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingSchema = void 0;
const index_1 = require("../../../../../src/index");
exports.MeetingSchema = new index_1.EntitySchema({
    name: "Meeting",
    columns: {
        Id: {
            primary: true,
            type: "int",
            generated: "increment",
        },
        StartsAt: {
            type: Date,
            nullable: false,
        },
        FinishesAt: {
            type: Date,
            nullable: false,
        },
    },
    exclusions: [
        {
            expression: `USING gist (tsrange("StartsAt", "FinishesAt") WITH &&)`,
        },
    ],
});
//# sourceMappingURL=Meeting.js.map