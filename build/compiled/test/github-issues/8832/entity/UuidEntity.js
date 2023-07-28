"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UuidEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let UuidEntity = class UuidEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], UuidEntity.prototype, "id", void 0);
UuidEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], UuidEntity);
exports.UuidEntity = UuidEntity;
//# sourceMappingURL=UuidEntity.js.map