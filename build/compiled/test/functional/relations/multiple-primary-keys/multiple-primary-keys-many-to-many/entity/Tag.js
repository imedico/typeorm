"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../../../src/decorator/relations/JoinTable");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Category_1 = require("./Category");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
let Tag = class Tag {
};
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Tag.prototype, "code", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(String, {
        length: 31,
    }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "title", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(String, {
        length: 31,
    }),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "description", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, (category) => category.tags),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Tag.prototype, "categories", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, (category) => category.tagsWithOptions),
    (0, JoinTable_1.JoinTable)({
        name: "tag_categories",
        joinColumns: [
            {
                name: "tagTitle",
                referencedColumnName: "title",
            },
            {
                name: "tagDescription",
                referencedColumnName: "description",
            },
        ],
        inverseJoinColumns: [
            {
                name: "categoryName",
                referencedColumnName: "name",
            },
            {
                name: "categoryType",
                referencedColumnName: "type",
            },
        ],
    }),
    tslib_1.__metadata("design:type", Array)
], Tag.prototype, "categoriesWithOptions", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Category_1.Category, (category) => category.tagsWithNonPKColumns),
    (0, JoinTable_1.JoinTable)({
        name: "tag_categories_non_primary",
        joinColumns: [
            {
                name: "tagTitle",
                referencedColumnName: "title",
            },
            {
                name: "tagDescription",
                referencedColumnName: "description",
            },
        ],
        inverseJoinColumns: [
            {
                name: "categoryCode",
                referencedColumnName: "code",
            },
            {
                name: "categoryVersion",
                referencedColumnName: "version",
            },
            {
                name: "categoryDescription",
                referencedColumnName: "description",
            },
        ],
    }),
    tslib_1.__metadata("design:type", Array)
], Tag.prototype, "categoriesWithNonPKColumns", void 0);
Tag = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=Tag.js.map