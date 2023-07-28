"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Tag_1 = require("./Tag");
const Category_1 = require("./Category");
const HeroImage_1 = require("./HeroImage");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "description", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, src_1.VersionColumn)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "version", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => HeroImage_1.HeroImage, (hero) => hero.post),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", HeroImage_1.HeroImage)
], Post.prototype, "heroImage", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Category_1.Category),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Tag_1.Tag, (tag) => tag.posts),
    (0, src_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "tags", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map