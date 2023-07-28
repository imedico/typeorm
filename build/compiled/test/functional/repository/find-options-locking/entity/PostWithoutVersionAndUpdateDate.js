"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithoutVersionAndUpdateDate = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
let PostWithoutVersionAndUpdateDate = class PostWithoutVersionAndUpdateDate {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithoutVersionAndUpdateDate.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithoutVersionAndUpdateDate.prototype, "title", void 0);
PostWithoutVersionAndUpdateDate = tslib_1.__decorate([
    (0, Entity_1.Entity)("post_without_v_ud")
], PostWithoutVersionAndUpdateDate);
exports.PostWithoutVersionAndUpdateDate = PostWithoutVersionAndUpdateDate;
//# sourceMappingURL=PostWithoutVersionAndUpdateDate.js.map