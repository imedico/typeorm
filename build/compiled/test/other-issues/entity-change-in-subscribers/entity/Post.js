"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const UpdateDateColumn_1 = require("../../../../src/decorator/columns/UpdateDateColumn");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const PostCategory_1 = require("./PostCategory");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
let Post = class Post {
    constructor() {
        this.updatedColumns = 0;
        this.updatedRelations = 0;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Post.prototype, "active", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "updateDate", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => PostCategory_1.PostCategory),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", PostCategory_1.PostCategory)
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "updatedColumns", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "updatedRelations", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map