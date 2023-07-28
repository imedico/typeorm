"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const PostDetails_1 = require("./PostDetails");
const OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "key", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => PostDetails_1.PostDetails, (details) => details.post, {
        cascade: ["insert"],
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", PostDetails_1.PostDetails)
], Post.prototype, "details", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map