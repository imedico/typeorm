"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSpecialColumns = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const CreateDateColumn_1 = require("../../../../../src/decorator/columns/CreateDateColumn");
const UpdateDateColumn_1 = require("../../../../../src/decorator/columns/UpdateDateColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const VersionColumn_1 = require("../../../../../src/decorator/columns/VersionColumn");
let PostSpecialColumns = class PostSpecialColumns {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostSpecialColumns.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostSpecialColumns.prototype, "title", void 0);
tslib_1.__decorate([
    (0, CreateDateColumn_1.CreateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostSpecialColumns.prototype, "createDate", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostSpecialColumns.prototype, "updateDate", void 0);
tslib_1.__decorate([
    (0, VersionColumn_1.VersionColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostSpecialColumns.prototype, "version", void 0);
PostSpecialColumns = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostSpecialColumns);
exports.PostSpecialColumns = PostSpecialColumns;
//# sourceMappingURL=PostSpecialColumns.js.map