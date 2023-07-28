"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const src_1 = require("../../../../../../src");
let Photo = class Photo {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: "My photo" }),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "name", void 0);
Photo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map