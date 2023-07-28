"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const src_1 = require("../../../../../src");
const Category_1 = require("./Category");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Object)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        nullable: true,
        unique: true,
        name: "eXtErNal___id", // makes sure we test handling differing property/database names where necessary
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "externalId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "subTitle", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        nullable: true,
        type: "date",
        transformer: {
            from: (value) => new Date(value),
            to: (value) => value === null || value === void 0 ? void 0 : value.toISOString(),
        },
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "dateAdded", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => Category_1.Category, { nullable: true }),
    tslib_1.__metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        name: "uPdAtEd___At", // makes sure we test handling differing property/database names where necessary
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map