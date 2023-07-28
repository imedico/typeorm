"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorSchema = exports.Author = void 0;
const Post_1 = require("./Post");
class Author {
}
exports.Author = Author;
exports.AuthorSchema = {
    name: "Author",
    target: Author,
    columns: {
        id: {
            primary: true,
            type: Number,
        },
        name: {
            type: "varchar",
        },
    },
    relations: {
        posts: {
            target: () => Post_1.Post,
            type: "one-to-many",
        },
    },
};
//# sourceMappingURL=Author.js.map