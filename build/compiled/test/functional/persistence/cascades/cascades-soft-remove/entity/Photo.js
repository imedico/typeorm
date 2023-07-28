"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const ManyToOne_1 = require("../../../../../../src/decorator/relations/ManyToOne");
const User_1 = require("./User");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const DeleteDateColumn_1 = require("../../../../../../src/decorator/columns/DeleteDateColumn");
let Photo = class Photo {
    constructor(name) {
        this.name = name;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "name", void 0);
tslib_1.__decorate([
    (0, DeleteDateColumn_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Photo.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => User_1.User, (user) => user.manyPhotos),
    tslib_1.__metadata("design:type", User_1.User)
], Photo.prototype, "user", void 0);
Photo = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [String])
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map