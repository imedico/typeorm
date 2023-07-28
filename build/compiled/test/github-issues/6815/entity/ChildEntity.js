"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildEntity = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
let ChildEntity = class ChildEntity {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    tslib_1.__metadata("design:type", String)
], ChildEntity.prototype, "id", void 0);
ChildEntity = tslib_1.__decorate([
    (0, src_1.Entity)()
], ChildEntity);
exports.ChildEntity = ChildEntity;
//# sourceMappingURL=ChildEntity.js.map