"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Post_1 = require("./Post");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const OneToMany_1 = require("../../../../../src/decorator/relations/OneToMany");
const OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
const CategoryMetadata_1 = require("./CategoryMetadata");
let Category = class Category {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "id", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.category),
    tslib_1.__metadata("design:type", Array)
], Category.prototype, "posts", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ type: "int", nullable: true }),
    tslib_1.__metadata("design:type", Number)
], Category.prototype, "metadataId", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => CategoryMetadata_1.CategoryMetadata, (metadata) => metadata.category, {
        cascade: ["insert"],
    }),
    (0, JoinColumn_1.JoinColumn)({ name: "metadataId" }),
    tslib_1.__metadata("design:type", CategoryMetadata_1.CategoryMetadata)
], Category.prototype, "metadata", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Category.prototype, "name", void 0);
Category = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=Category.js.map