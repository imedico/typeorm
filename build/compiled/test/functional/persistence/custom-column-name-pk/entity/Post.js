"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
const Category_1 = require("./Category");
const Generated_1 = require("../../../../../src/decorator/Generated");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)({ name: "theId" }),
    (0, Generated_1.Generated)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Category_1.Category, (category) => category.posts, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map