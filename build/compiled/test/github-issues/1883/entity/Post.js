"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const FruitEnum_1 = require("../enum/FruitEnum");
const Column_1 = require("../../../../src/decorator/columns/Column");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("enum", { enum: FruitEnum_1.FruitEnum, default: FruitEnum_1.FruitEnum.Apple }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "fruit", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map