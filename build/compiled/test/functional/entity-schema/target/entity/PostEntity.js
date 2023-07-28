"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = void 0;
const src_1 = require("../../../../../src");
const Post_1 = require("../model/Post");
exports.PostEntity = new src_1.EntitySchema({
    name: "post",
    target: Post_1.Post,
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        title: {
            type: String,
        },
        text: {
            type: String,
        },
    },
});
//# sourceMappingURL=PostEntity.js.map