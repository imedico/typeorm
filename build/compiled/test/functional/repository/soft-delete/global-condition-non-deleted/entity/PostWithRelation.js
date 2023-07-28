"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithRelation = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
const CategoryWithRelation_1 = require("./CategoryWithRelation");
const DeleteDateColumn_1 = require("../../../../../../src/decorator/columns/DeleteDateColumn");
let PostWithRelation = class PostWithRelation {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithRelation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithRelation.prototype, "title", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => CategoryWithRelation_1.CategoryWithRelation, (category) => category.post, {
        eager: true,
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", CategoryWithRelation_1.CategoryWithRelation)
], PostWithRelation.prototype, "category", void 0);
tslib_1.__decorate([
    (0, DeleteDateColumn_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostWithRelation.prototype, "deletedAt", void 0);
PostWithRelation = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostWithRelation);
exports.PostWithRelation = PostWithRelation;
//# sourceMappingURL=PostWithRelation.js.map