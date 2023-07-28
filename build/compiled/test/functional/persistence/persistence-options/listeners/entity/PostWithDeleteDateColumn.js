"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithDeleteDateColumn = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const DeleteDateColumn_1 = require("../../../../../../src/decorator/columns/DeleteDateColumn");
const src_1 = require("../../../../../../src");
let PostWithDeleteDateColumn = class PostWithDeleteDateColumn {
    constructor() {
        this.isSoftRemoved = false;
    }
    beforeSoftRemove() {
        this.title += "!";
    }
    afterSoftRemove() {
        this.isSoftRemoved = true;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithDeleteDateColumn.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithDeleteDateColumn.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithDeleteDateColumn.prototype, "description", void 0);
tslib_1.__decorate([
    (0, DeleteDateColumn_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostWithDeleteDateColumn.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, src_1.BeforeSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostWithDeleteDateColumn.prototype, "beforeSoftRemove", null);
tslib_1.__decorate([
    (0, src_1.AfterSoftRemove)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PostWithDeleteDateColumn.prototype, "afterSoftRemove", null);
PostWithDeleteDateColumn = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostWithDeleteDateColumn);
exports.PostWithDeleteDateColumn = PostWithDeleteDateColumn;
//# sourceMappingURL=PostWithDeleteDateColumn.js.map