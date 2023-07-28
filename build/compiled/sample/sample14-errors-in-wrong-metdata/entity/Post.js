"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const PostAuthor_1 = require("./PostAuthor");
const JoinColumn_1 = require("../../../src/decorator/relations/JoinColumn");
const OneToMany_1 = require("../../../src/decorator/relations/OneToMany");
const JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
const ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
let Post = class Post {
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
    (0, index_1.OneToOne)((type) => PostAuthor_1.PostAuthor, (author) => author.post, {
        cascade: true,
    }),
    (0, JoinColumn_1.JoinColumn)() // comment this and you'll get an error because JoinColumn must be at least on one side of the one-to-one relationship
    // @JoinTable() // uncomment this and you'll get an error because JoinTable is not allowed here (only many-to-many)
    ,
    tslib_1.__metadata("design:type", PostAuthor_1.PostAuthor)
], Post.prototype, "author", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => PostAuthor_1.PostAuthor, (author) => author.editedPost, {
        cascade: true,
    })
    // @JoinColumn() // uncomment this and you'll get an error, because JoinColumn is not allowed here (only many-to-one/one-to-one)
    // @JoinTable() // uncomment this and you'll get an error because JoinTable is not allowed here (only many-to-many)
    ,
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "editors", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => PostAuthor_1.PostAuthor, (author) => author.manyPosts),
    (0, JoinTable_1.JoinTable)() // comment this and you'll get an error because JoinTable must be at least on one side of the many-to-many relationship
    ,
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "manyAuthors", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample14_post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map