"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Author = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../src/index");
const Post_1 = require("./Post");
const OneToMany_1 = require("../../../src/decorator/relations/OneToMany");
let Author = class Author {
    /**
     * You can add this helper method.
     */
    asPromise() {
        return Promise.resolve(this);
    }
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
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.author, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Promise)
], Author.prototype, "posts", void 0);
Author = tslib_1.__decorate([
    (0, index_1.Entity)("sample18_author")
], Author);
exports.Author = Author;
//# sourceMappingURL=Author.js.map