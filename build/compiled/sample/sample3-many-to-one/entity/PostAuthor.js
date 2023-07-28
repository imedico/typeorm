"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAuthor = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
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
    (0, index_1.OneToMany)((type) => Post_1.Post, (post) => post.author),
    tslib_1.__metadata("design:type", Array)
], PostAuthor.prototype, "posts", void 0);
PostAuthor = tslib_1.__decorate([
    (0, index_1.Entity)("sample3_post_author")
], PostAuthor);
exports.PostAuthor = PostAuthor;
//# sourceMappingURL=PostAuthor.js.map