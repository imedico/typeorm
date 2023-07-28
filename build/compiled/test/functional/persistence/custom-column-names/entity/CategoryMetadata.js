"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMetadata = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../../src/decorator/relations/OneToOne");
const Category_1 = require("./Category");
let CategoryMetadata = class CategoryMetadata {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], CategoryMetadata.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], CategoryMetadata.prototype, "keyword", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Category_1.Category, (category) => category.metadata),
    tslib_1.__metadata("design:type", Category_1.Category)
], CategoryMetadata.prototype, "category", void 0);
CategoryMetadata = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], CategoryMetadata);
exports.CategoryMetadata = CategoryMetadata;
//# sourceMappingURL=CategoryMetadata.js.map