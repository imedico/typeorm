"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostDetails = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
let PostDetails = class PostDetails {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostDetails.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostDetails.prototype, "authorName", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostDetails.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostDetails.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => Post_1.Post, (post) => post.details, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Post_1.Post)
], PostDetails.prototype, "post", void 0);
PostDetails = tslib_1.__decorate([
    (0, index_1.Entity)("sample2_post_details")
], PostDetails);
exports.PostDetails = PostDetails;
//# sourceMappingURL=PostDetails.js.map