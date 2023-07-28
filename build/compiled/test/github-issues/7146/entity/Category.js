"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Post_1 = require("./Post");
let Category = class Category {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Post_1.Post, (post) => post.lazyOneToOne, {
        nullable: true,
        eager: false,
    }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Post_1.Post)
], Category.prototype, "backRef1", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)((type) => Post_1.Post, (post) => post.eagerOneToOne, {
        nullable: true,
        eager: false,
    }),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Post_1.Post)
], Category.prototype, "backRef2", void 0);
Category = tslib_1.__decorate([
    (0, src_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map