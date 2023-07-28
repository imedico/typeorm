"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetPost = exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Comment_1 = require("./Comment");
let Post = class Post {
    constructor() {
        this.postType = "BasePost";
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "postType", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => Comment_1.Comment, (entity) => entity.post),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "comments", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.TableInheritance)({ column: { type: "string", name: "postType" } })
], Post);
exports.Post = Post;
let TargetPost = class TargetPost extends Post {
    constructor() {
        super(...arguments);
        this.postType = "TargetPost";
    }
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], TargetPost.prototype, "postType", void 0);
TargetPost = tslib_1.__decorate([
    (0, src_1.ChildEntity)("TargetPost")
], TargetPost);
exports.TargetPost = TargetPost;
//# sourceMappingURL=Post.js.map