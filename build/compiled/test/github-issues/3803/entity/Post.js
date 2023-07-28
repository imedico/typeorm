"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.Post = void 0;
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
        name: {
            type: String,
            unique: true,
        },
        title: {
            type: String,
        },
    },
};
//# sourceMappingURL=Post.js.map