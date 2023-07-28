"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostVersion = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../src/decorator/relations/ManyToOne");
const src_1 = require("../../../../src");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Post_1 = require("./Post");
let PostVersion = class PostVersion {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostVersion.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Post_1.Post),
    (0, src_1.JoinColumn)({ referencedColumnName: "version" }),
    tslib_1.__metadata("design:type", Post_1.Post)
], PostVersion.prototype, "post", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostVersion.prototype, "details", void 0);
PostVersion = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostVersion);
exports.PostVersion = PostVersion;
//# sourceMappingURL=PostVersion.js.map