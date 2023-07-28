"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostTagSchema = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Post_1 = tslib_1.__importDefault(require("./Post"));
let id = 0;
class PostTag {
    constructor() {
        this.tagId = id++;
    }
}
exports.default = PostTag;
exports.PostTagSchema = new src_1.EntitySchema({
    name: "PostTag",
    target: PostTag,
    columns: {
        tagOtherId: {
            type: Number,
            primary: true,
        },
        tagPostId: {
            type: Number,
            primary: true,
        },
        tagId: {
            type: Number,
            primary: true,
            nullable: false,
        },
    },
    relations: {
        post: {
            nullable: false,
            target: () => Post_1.default,
            type: "many-to-one",
            joinColumn: [
                { name: "tagPostId", referencedColumnName: "postId" },
                { name: "tagOtherId", referencedColumnName: "otherId" },
            ],
        },
    },
});
//# sourceMappingURL=PostTag.js.map