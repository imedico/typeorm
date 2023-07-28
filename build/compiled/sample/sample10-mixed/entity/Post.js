"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Image_1 = require("./Image");
const Cover_1 = require("./Cover");
const Category_1 = require("./Category");
const PostDetails_1 = require("./PostDetails");
const JoinColumn_1 = require("../../../src/decorator/relations/JoinColumn");
const JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
let Post = class Post {
    constructor() {
        this.images = [];
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, index_1.Column)({
        nullable: false,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => PostDetails_1.PostDetails, (details) => details.post, {
        cascade: true,
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", PostDetails_1.PostDetails)
], Post.prototype, "details", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Image_1.Image, (image) => image.post, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "images", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Image_1.Image, (image) => image.secondaryPost),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "secondaryImages", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Cover_1.Cover, (cover) => cover.posts, {
        cascade: ["insert"],
    }),
    (0, JoinColumn_1.JoinColumn)({ name: "coverId" }),
    tslib_1.__metadata("design:type", Cover_1.Cover)
], Post.prototype, "cover", void 0);
tslib_1.__decorate([
    (0, index_1.Column)("int", {
        nullable: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "coverId", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => Category_1.Category, (category) => category.posts, {
        cascade: true,
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "categories", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample10_post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map