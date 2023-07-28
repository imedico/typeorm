"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const PostTag_1 = tslib_1.__importDefault(require("./PostTag"));
const PostAttachment_1 = tslib_1.__importDefault(require("./PostAttachment"));
let id = 0;
class Post {
    constructor() {
        this.postId = id++;
        this.otherId = id++;
    }
}
exports.default = Post;
exports.PostSchema = new src_1.EntitySchema({
    name: "Post",
    target: Post,
    columns: {
        otherId: {
            type: Number,
            primary: true,
            nullable: false,
        },
        postId: {
            type: Number,
            primary: true,
            nullable: false,
        },
    },
    relations: {
        tags: {
            target: () => PostTag_1.default,
            type: "one-to-many",
            inverseSide: "post",
            cascade: true,
        },
        attachments: {
            target: () => PostAttachment_1.default,
            type: "one-to-many",
            inverseSide: "post",
            cascade: true,
        },
    },
});
//# sourceMappingURL=Post.js.map