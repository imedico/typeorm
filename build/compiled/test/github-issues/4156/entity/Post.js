"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.Post = void 0;
const Author_1 = require("./Author");
class Post {
}
exports.Post = Post;
exports.PostSchema = {
    name: "Post",
    target: Post,
    columns: {
        id: {
            primary: true,
            type: Number,
        },
        title: {
            type: "varchar",
        },
    },
    relations: {
        author: {
            target: () => Author_1.Author,
            type: "many-to-one",
            eager: true,
        },
    },
};
//# sourceMappingURL=Post.js.map