"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Counters_1 = require("./Counters");
let Post = class Post {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, index_1.Column)((type) => Counters_1.Counters),
    tslib_1.__metadata("design:type", Counters_1.Counters)
], Post.prototype, "counters", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample26_post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map