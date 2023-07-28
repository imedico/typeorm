"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
let Post = class Post {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, index_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "createdDate", void 0);
tslib_1.__decorate([
    (0, index_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "updatedDate", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)({
        orderBy: {
            updatedDate: "DESC",
        },
    })
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map