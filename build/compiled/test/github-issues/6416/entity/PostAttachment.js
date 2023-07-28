"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAttachmentSchema = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Post_1 = tslib_1.__importDefault(require("./Post"));
let id = 0;
class PostAttachment {
    constructor() {
        this.attachmentId = id++;
    }
}
exports.default = PostAttachment;
exports.PostAttachmentSchema = new src_1.EntitySchema({
    name: "PostAttachment",
    target: PostAttachment,
    columns: {
        postPostId: {
            type: Number,
            primary: true,
            nullable: false,
        },
        postOtherId: {
            type: Number,
            primary: true,
            nullable: false,
        },
        attachmentId: {
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
        },
    },
});
//# sourceMappingURL=PostAttachment.js.map