"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostByCategory = void 0;
const tslib_1 = require("tslib");
const ViewColumn_1 = require("../../../../../src/decorator/columns/ViewColumn");
const ViewEntity_1 = require("../../../../../src/decorator/entity-view/ViewEntity");
const Category_1 = require("./Category");
const Post_1 = require("./Post");
let PostByCategory = class PostByCategory {
};
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", String)
], PostByCategory.prototype, "categoryName", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostByCategory.prototype, "postCount", void 0);
PostByCategory = tslib_1.__decorate([
    (0, ViewEntity_1.ViewEntity)({
        materialized: true,
        expression: (connection) => connection
            .createQueryBuilder()
            .select("category.name", "categoryName")
            .addSelect("COUNT(post.id)", "postCount")
            .from(Post_1.Post, "post")
            .innerJoin(Category_1.Category, "category", "category.id = post.categoryId")
            .groupBy("category.name"),
    })
], PostByCategory);
exports.PostByCategory = PostByCategory;
//# sourceMappingURL=PostByCategory.js.map