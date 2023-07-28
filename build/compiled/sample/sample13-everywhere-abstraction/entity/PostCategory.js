"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategory = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
const ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
let PostCategory = class PostCategory {
    constructor() {
        this.posts = [];
    }
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categories, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Array)
], PostCategory.prototype, "posts", void 0);
PostCategory = tslib_1.__decorate([
    (0, index_1.Entity)("sample13_post_category")
], PostCategory);
exports.PostCategory = PostCategory;
//# sourceMappingURL=PostCategory.js.map