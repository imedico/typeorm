"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col1", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: () => "current_timestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: () => "getdate()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col3", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col4", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ default: () => "current_timestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col5", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ default: () => "getdate()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col6", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col7", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ default: () => "current_timestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col8", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ default: () => "getdate()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col9", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map