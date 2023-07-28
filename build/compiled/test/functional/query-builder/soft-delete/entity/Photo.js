"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const DeleteDateColumn_1 = require("../../../../../src/decorator/columns/DeleteDateColumn");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const Counters_1 = require("./Counters");
let Photo = class Photo {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "url", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Counters_1.Counters),
    tslib_1.__metadata("design:type", Counters_1.Counters)
], Photo.prototype, "counters", void 0);
tslib_1.__decorate([
    (0, DeleteDateColumn_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Photo.prototype, "deletedAt", void 0);
Photo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map