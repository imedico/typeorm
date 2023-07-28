"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const tslib_1 = require("tslib");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
const ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
const JoinColumn_1 = require("../../../../../src/decorator/relations/JoinColumn");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const BaseEntity_1 = require("../../../../../src/repository/BaseEntity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const post_entity_1 = require("./post.entity");
let Tag = class Tag extends BaseEntity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Tag.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Tag.prototype, "name", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)(() => post_entity_1.Post),
    (0, JoinColumn_1.JoinColumn)({ name: "tag_to_post" }),
    tslib_1.__metadata("design:type", Object)
], Tag.prototype, "posts", void 0);
Tag = tslib_1.__decorate([
    (0, Entity_1.Entity)("tag_test")
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=tag.entity.js.map