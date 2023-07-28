"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const index_1 = require("../../../../../src/index");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const Category_1 = require("./Category");
let Photo = class Photo {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({
        length: 500,
    }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "description", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "filename", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "views", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], Photo.prototype, "isPublished", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => Category_1.Category),
    (0, index_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], Photo.prototype, "categories", void 0);
Photo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map