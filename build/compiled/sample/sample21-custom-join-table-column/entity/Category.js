"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
const Post_1 = require("./Post");
let Category = class Category {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categories),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "posts", void 0);
Category = tslib_1.__decorate([
    (0, index_1.Entity)("sample21_category")
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map