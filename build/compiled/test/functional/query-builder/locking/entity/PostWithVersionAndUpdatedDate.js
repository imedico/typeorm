"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithVersionAndUpdatedDate = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const VersionColumn_1 = require("../../../../../src/decorator/columns/VersionColumn");
const UpdateDateColumn_1 = require("../../../../../src/decorator/columns/UpdateDateColumn");
let PostWithVersionAndUpdatedDate = class PostWithVersionAndUpdatedDate {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithVersionAndUpdatedDate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithVersionAndUpdatedDate.prototype, "title", void 0);
tslib_1.__decorate([
    (0, VersionColumn_1.VersionColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithVersionAndUpdatedDate.prototype, "version", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostWithVersionAndUpdatedDate.prototype, "updateDate", void 0);
PostWithVersionAndUpdatedDate = tslib_1.__decorate([
    (0, Entity_1.Entity)("post_with_v_ud")
], PostWithVersionAndUpdatedDate);
exports.PostWithVersionAndUpdatedDate = PostWithVersionAndUpdatedDate;
//# sourceMappingURL=PostWithVersionAndUpdatedDate.js.map