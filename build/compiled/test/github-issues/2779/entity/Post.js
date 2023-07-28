"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const set_1 = require("../set");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)("set", {
        default: [set_1.Role.Admin, set_1.Role.Developer],
        enum: set_1.Role,
    }),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "roles", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)("post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map