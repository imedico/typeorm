"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplePost = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const SimpleCounters_1 = require("./SimpleCounters");
let SimplePost = class SimplePost {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], SimplePost.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SimplePost.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], SimplePost.prototype, "text", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => SimpleCounters_1.SimpleCounters),
    tslib_1.__metadata("design:type", SimpleCounters_1.SimpleCounters)
], SimplePost.prototype, "counters", void 0);
SimplePost = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], SimplePost);
exports.SimplePost = SimplePost;
//# sourceMappingURL=SimplePost.js.map