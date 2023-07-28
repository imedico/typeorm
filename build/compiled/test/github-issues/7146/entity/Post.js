"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Category_1 = require("./Category");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Category_1.Category, { nullable: true, eager: false }),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "lazyManyToOne", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)((type) => Category_1.Category, { nullable: true, eager: true }),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "eagerManyToOne", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Category_1.Category, { nullable: true, eager: false }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "lazyOneToOneOwner", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Category_1.Category, { nullable: true, eager: true }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "eagerOneToOneOwner", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Category_1.Category, (category) => category.backRef1, {
        eager: false,
    }),
    tslib_1.__metadata("design:type", Promise)
], Post.prototype, "lazyOneToOne", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Category_1.Category, (category) => category.backRef2, {
        eager: true,
    }),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "eagerOneToOne", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map