"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDetails = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
const Chapter_1 = require("./Chapter");
const Category_1 = require("./Category");
let PostDetails = class PostDetails {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostDetails.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostDetails.prototype, "meta", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostDetails.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => Post_1.Post, (post) => post.details),
    tslib_1.__metadata("design:type", Post_1.Post)
], PostDetails.prototype, "post", void 0);
tslib_1.__decorate([
    (0, index_1.OneToMany)((type) => Category_1.Category, (category) => category.details, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", Array)
], PostDetails.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Chapter_1.Chapter, (chapter) => chapter.postDetails, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", Chapter_1.Chapter)
], PostDetails.prototype, "chapter", void 0);
PostDetails = tslib_1.__decorate([
    (0, index_1.Entity)("sample10_post_details")
], PostDetails);
exports.PostDetails = PostDetails;
//# sourceMappingURL=PostDetails.js.map