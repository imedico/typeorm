"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryWithRelation = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const PostWithRelation_1 = require("./PostWithRelation");
let CategoryWithRelation = class CategoryWithRelation {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], CategoryWithRelation.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], CategoryWithRelation.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => PostWithRelation_1.PostWithRelation, (post) => post.category),
    tslib_1.__metadata("design:type", PostWithRelation_1.PostWithRelation)
], CategoryWithRelation.prototype, "post", void 0);
CategoryWithRelation = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], CategoryWithRelation);
exports.CategoryWithRelation = CategoryWithRelation;
//# sourceMappingURL=CategoryWithRelation.js.map