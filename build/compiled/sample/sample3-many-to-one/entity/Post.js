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
    (0, index_1.ManyToOne)((type) => PostCategory_1.PostCategory, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", PostCategory_1.PostCategory
    // post has relation with details. cascade inserts here means if new PostDetails instance will be set to this
    // relation it will be inserted automatically to the db when you save this Post entity
    )
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => PostDetails_1.PostDetails, (details) => details.posts, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", PostDetails_1.PostDetails
    // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
    // it will be inserted automatically to the db when you save this Post entity
    )
], Post.prototype, "details", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => PostImage_1.PostImage, (image) => image.posts, {
        cascade: ["update"],
    }),
    tslib_1.__metadata("design:type", PostImage_1.PostImage
    // post has relation with details. cascade update here means if new PostDetail instance will be set to this relation
    // it will be inserted automatically to the db when you save this Post entity
    )
], Post.prototype, "image", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => PostMetadata_1.PostMetadata, (metadata) => metadata.posts),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => PostInformation_1.PostInformation, (information) => information.posts, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", PostInformation_1.PostInformation
    // post has relation with details. not cascades here. means cannot be persisted, updated or removed
    )
], Post.prototype, "information", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => PostAuthor_1.PostAuthor, (author) => author.posts),
    tslib_1.__metadata("design:type", PostAuthor_1.PostAuthor)
], Post.prototype, "author", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample3_post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map