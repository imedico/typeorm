"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategory = void 0;
const tslib_1 = require("tslib");
const ViewColumn_1 = require("../../../../../src/decorator/columns/ViewColumn");
const ViewEntity_1 = require("../../../../../src/decorator/entity-view/ViewEntity");
const Category_1 = require("./Category");
const Post_1 = require("./Post");
let PostCategory = class PostCategory {
};
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], PostCategory.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], PostCategory.prototype, "categoryName", void 0);
PostCategory = tslib_1.__decorate([
    (0, ViewEntity_1.ViewEntity)({
        expression: (connection) => connection
            .createQueryBuilder()
            .select("post.id", "id")
            .addSelect("post.name", "name")
            .addSelect("category.name", "categoryName")
            .from(Post_1.Post, "post")
            .leftJoin(Category_1.Category, "category", "category.id = post.categoryId"),
    })
], PostCategory);
exports.PostCategory = PostCategory;
//# sourceMappingURL=PostCategory.js.map