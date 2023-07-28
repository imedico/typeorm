"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
const Tag_1 = require("./Tag");
const Author_1 = require("./Author");
const Counters_1 = require("./Counters");
let Post = class Post {
    toString() {
        return this.title;
    }
    doSomething() {
        return 123;
    }
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Tag_1.Tag, (tag) => tag.posts),
    (0, src_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "tags", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Author_1.Author),
    tslib_1.__metadata("design:type", Author_1.Author)
], Post.prototype, "author", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(() => Counters_1.Counters),
    tslib_1.__metadata("design:type", Counters_1.Counters)
], Post.prototype, "counters", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map