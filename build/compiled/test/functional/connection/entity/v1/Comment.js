"use strict";
var Comment_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
const OneToMany_1 = require("../../../../../src/decorator/relations/OneToMany");
const Index_1 = require("../../../../../src/decorator/Index");
const Guest_1 = require("./Guest");
let Comment = Comment_1 = class Comment {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Comment.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    (0, Index_1.Index)(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Comment.prototype, "context", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Comment_1, (comment) => comment.relay),
    tslib_1.__metadata("design:type", Comment)
], Comment.prototype, "reference", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Comment_1, (comment) => comment.reference),
    tslib_1.__metadata("design:type", Comment)
], Comment.prototype, "relay", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Guest_1.Guest, (guest) => guest.comments),
    tslib_1.__metadata("design:type", Guest_1.Guest)
], Comment.prototype, "author", void 0);
Comment = Comment_1 = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)("author_and_title_unique", ["author", "title"], { unique: true })
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=Comment.js.map