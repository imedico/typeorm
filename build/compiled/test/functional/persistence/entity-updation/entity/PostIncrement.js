"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostIncrement = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
let PostIncrement = class PostIncrement {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostIncrement.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostIncrement.prototype, "text", void 0);
PostIncrement = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostIncrement);
exports.PostIncrement = PostIncrement;
//# sourceMappingURL=PostIncrement.js.map