"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const tslib_1 = require("tslib");
const Post_1 = require("./Post");
const src_1 = require("../../../../../src");
let Tag = class Tag {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Tag.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)(() => Post_1.Post, (post) => post.tags),
    tslib_1.__metadata("design:type", Array)
], Tag.prototype, "posts", void 0);
Tag = tslib_1.__decorate([
    (0, src_1.Entity)()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map