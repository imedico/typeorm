"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const DeleteDateColumn_1 = require("../../../../../src/decorator/columns/DeleteDateColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const Photo_1 = require("./Photo");
const src_1 = require("../../../../../src");
let User = class User {
    constructor() {
        this.likesCount = 0;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "likesCount", void 0);
tslib_1.__decorate([
    (0, src_1.OneToOne)(() => Photo_1.Photo),
    (0, src_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], User.prototype, "picture", void 0);
tslib_1.__decorate([
    (0, DeleteDateColumn_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map