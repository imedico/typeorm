"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostUuid = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
let PostUuid = class PostUuid {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", Number)
], PostUuid.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostUuid.prototype, "text", void 0);
PostUuid = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostUuid);
exports.PostUuid = PostUuid;
//# sourceMappingURL=PostUuid.js.map