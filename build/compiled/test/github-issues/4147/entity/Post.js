"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = exports.Post = exports.PostType = void 0;
var PostType;
(function (PostType) {
    PostType["draft"] = "draft";
    PostType["published"] = "published";
})(PostType = exports.PostType || (exports.PostType = {}));
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
        type: {
            type: "simple-enum",
            enum: PostType,
        },
    },
};
//# sourceMappingURL=Post.js.map