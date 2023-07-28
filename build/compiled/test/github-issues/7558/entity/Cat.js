"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Animal_1 = require("./Animal");
let CatEntity = class CatEntity extends Animal_1.AnimalEntity {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], CatEntity.prototype, "livesLeft", void 0);
CatEntity = tslib_1.__decorate([
    (0, src_1.ChildEntity)("cat")
], CatEntity);
exports.CatEntity = CatEntity;
//# sourceMappingURL=Cat.js.map