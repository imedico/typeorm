"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: Boolean }),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "isEdited", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map