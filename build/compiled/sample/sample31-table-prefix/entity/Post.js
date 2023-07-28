"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const JoinTable_1 = require("../../../src/decorator/relations/JoinTable");
const ManyToMany_1 = require("../../../src/decorator/relations/ManyToMany");
const Author_1 = require("./Author");
const Category_1 = require("./Category");
let Post = class Post {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToOne)((type) => Author_1.Author, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", Author_1.Author)
], Post.prototype, "author", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, {
        cascade: ["insert"],
    }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "categories", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)("sample31_post")
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map