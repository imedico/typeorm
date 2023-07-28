"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostReview = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Post_1 = require("./Post");
let PostReview = class PostReview {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostReview.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PostReview.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostReview.prototype, "comment", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Post_1.Post),
    tslib_1.__metadata("design:type", Post_1.Post)
], PostReview.prototype, "post", void 0);
PostReview = tslib_1.__decorate([
    (0, src_1.Entity)()
], PostReview);
exports.PostReview = PostReview;
//# sourceMappingURL=PostReview.js.map