"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const PostDetails_1 = require("./PostDetails");
const PostCategory_1 = require("./PostCategory");
const PostAuthor_1 = require("./PostAuthor");
const PostInformation_1 = require("./PostInformation");
const PostImage_1 = require("./PostImage");
const PostMetadata_1 = require("./PostMetadata");
const JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
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
    (0, index_1.ManyToMany)((type) => PostCategory_1.PostCategory, {
        cascade: true,
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => PostDetails_1.PostDetails, (details) => details.posts, {
        cascade: ["insert"],
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "details", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => PostImage_1.PostImage, (image) => image.posts, {
        cascade: ["update"],
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "images", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => PostMetadata_1.PostMetadata, (metadata) => metadata.posts),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "metadatas", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => PostInformation_1.PostInformation, (information) => information.posts, {
        cascade: true,
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "informations", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => PostAuthor_1.PostAuthor, (author) => author.posts),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "authors", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample4_post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map