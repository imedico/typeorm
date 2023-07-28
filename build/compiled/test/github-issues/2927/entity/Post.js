"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Content_1 = require("./Content");
let Post = class Post extends Content_1.Content {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "viewCount", void 0);
Post = tslib_1.__decorate([
    (0, src_1.ChildEntity)(Content_1.ContentType.Post)
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map