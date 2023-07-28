"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const User_1 = require("./User");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
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
    (0, ManyToOne_1.ManyToOne)((type) => User_1.User),
    tslib_1.__metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
Post = tslib_1.__decorate([
    (0, index_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map