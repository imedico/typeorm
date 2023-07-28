"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const PostCategory_1 = require("./PostCategory");
const PostAuthor_1 = require("./PostAuthor");
const ManyToOne_1 = require("../../../src/decorator/relations/ManyToOne");
const JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
let Post = class Post {
    constructor() {
        this.categories = [];
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => PostAuthor_1.PostAuthor, (post) => post.posts, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", PostAuthor_1.PostAuthor)
], Post.prototype, "author", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => PostCategory_1.PostCategory, (category) => category.posts, {
        cascade: true,
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "categories", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample7_post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map