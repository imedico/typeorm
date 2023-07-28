"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithUpdateDate = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const UpdateDateColumn_1 = require("../../../../../src/decorator/columns/UpdateDateColumn");
let PostWithUpdateDate = class PostWithUpdateDate {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithUpdateDate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithUpdateDate.prototype, "title", void 0);
tslib_1.__decorate([
    (0, UpdateDateColumn_1.UpdateDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], PostWithUpdateDate.prototype, "updateDate", void 0);
PostWithUpdateDate = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostWithUpdateDate);
exports.PostWithUpdateDate = PostWithUpdateDate;
//# sourceMappingURL=PostWithUpdateDate.js.map