"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const Post_1 = require("./Post");
let Category = class Category {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)({ collation: "ascii_general_ci", charset: "ascii" }),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Post_1.Post, (post) => post.categories),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "posts", void 0);
Category = tslib_1.__decorate([
    (0, src_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map