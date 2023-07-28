"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostWithVersion = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const VersionColumn_1 = require("../../../../../src/decorator/columns/VersionColumn");
let PostWithVersion = class PostWithVersion {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithVersion.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostWithVersion.prototype, "title", void 0);
tslib_1.__decorate([
    (0, VersionColumn_1.VersionColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostWithVersion.prototype, "version", void 0);
PostWithVersion = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostWithVersion);
exports.PostWithVersion = PostWithVersion;
//# sourceMappingURL=PostWithVersion.js.map