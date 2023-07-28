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
    (0, src_1.Column)({ default: () => "CURRENT_TIMESTAMP()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ precision: 3, default: () => "CURRENT_TIMESTAMP(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col3", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: () => "current_timestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col4", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: () => "current_timestamp()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col5", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ precision: 3, default: () => "current_timestamp(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col6", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ default: () => "NOW()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col7", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ precision: 3, default: () => "NOW(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col8", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ precision: 3, default: () => "now(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col9", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: null, default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col10", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: null, default: () => "CURRENT_TIMESTAMP()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col11", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: 3, default: () => "CURRENT_TIMESTAMP(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col12", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: null, default: () => "current_timestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col13", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: 3, default: () => "current_timestamp(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col14", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: null, default: () => "NOW()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col15", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: 3, default: () => "NOW(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col16", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: null, default: () => "now()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col17", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ precision: 3, default: () => "now(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col18", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: null,
        default: () => "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col19", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: null,
        default: () => "CURRENT_TIMESTAMP()",
        onUpdate: "CURRENT_TIMESTAMP()",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col20", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: 3,
        default: () => "CURRENT_TIMESTAMP(3)",
        onUpdate: "CURRENT_TIMESTAMP(3)",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col21", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: null,
        default: () => "current_timestamp",
        onUpdate: "current_timestamp",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col22", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: 3,
        default: () => "current_timestamp(3)",
        onUpdate: "current_timestamp(3)",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col23", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: null,
        default: () => "NOW()",
        onUpdate: "NOW()",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col24", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: 3,
        default: () => "NOW(3)",
        onUpdate: "NOW(3)",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col25", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: null,
        default: () => "now()",
        onUpdate: "now()",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col26", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        precision: 3,
        default: () => "now(3)",
        onUpdate: "now(3)",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col27", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map