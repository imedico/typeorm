"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const src_3 = require("../../../../src");
const src_4 = require("../../../../src");
const Author_1 = require("./Author");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_4.ManyToOne)((type) => Author_1.Author),
    (0, src_3.JoinColumn)(),
    tslib_1.__metadata("design:type", Author_1.Author)
], Post.prototype, "author", void 0);
Post = tslib_1.__decorate([
    (0, src_2.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map