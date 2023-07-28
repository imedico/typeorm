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
        authorPublisherId: {
            primary: true,
            type: Number,
        },
        authorId: {
            primary: true,
            type: Number,
        },
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
            joinColumn: [
                {
                    name: "authorPublisherId",
                    referencedColumnName: "publisherId",
                },
                { name: "authorId", referencedColumnName: "id" },
            ],
        },
    },
};
//# sourceMappingURL=Post.js.map