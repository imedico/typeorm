"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "Question",
    table: {
        name: "question",
    },
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        title: {
            type: String,
            nullable: false,
        },
    },
    target: function Question() {
        this.type = "question";
    },
};
//# sourceMappingURL=QuestionSchema.js.map