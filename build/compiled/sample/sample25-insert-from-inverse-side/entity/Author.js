"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const OneToMany_1 = require("../../../src/decorator/relations/OneToMany");
const Post_1 = require("./Post");
let Author = class Author {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Author.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Author.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (author) => author.author),
    tslib_1.__metadata("design:type", Array)
], Author.prototype, "posts", void 0);
Author = tslib_1.__decorate([
    (0, index_1.Entity)("sample25_author")
], Author);
exports.Author = Author;
//# sourceMappingURL=Author.js.map