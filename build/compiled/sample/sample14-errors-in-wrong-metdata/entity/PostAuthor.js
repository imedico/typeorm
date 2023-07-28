"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAuthor = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
const ManyToOne_1 = require("../../../src/decorator/relations/ManyToOne");
const ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
let PostAuthor = class PostAuthor {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostAuthor.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostAuthor.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => Post_1.Post, (post) => post.author)
    // @JoinColumn() // uncomment this and it will case an error, because JoinColumn is allowed only on one side
    ,
    tslib_1.__metadata("design:type", Post_1.Post)
], PostAuthor.prototype, "post", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Post_1.Post, (post) => post.editors)
    // @JoinColumn() // JoinColumn is optional here, so if it present or not you should not get an error
    ,
    tslib_1.__metadata("design:type", Post_1.Post)
], PostAuthor.prototype, "editedPost", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.manyAuthors)
    // @JoinTable() // uncomment this and it will case an error, because only one side of the ManyToMany relation can have a JoinTable decorator.
    ,
    tslib_1.__metadata("design:type", Array)
], PostAuthor.prototype, "manyPosts", void 0);
PostAuthor = tslib_1.__decorate([
    (0, index_1.Entity)("sample14_post_author")
], PostAuthor);
exports.PostAuthor = PostAuthor;
//# sourceMappingURL=PostAuthor.js.map