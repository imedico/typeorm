"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBigInt = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
let PostBigInt = class PostBigInt {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostBigInt.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], PostBigInt.prototype, "title", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("bigint", {
        unsigned: true,
    }),
    tslib_1.__metadata("design:type", String)
], PostBigInt.prototype, "counter", void 0);
PostBigInt = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostBigInt);
exports.PostBigInt = PostBigInt;
//# sourceMappingURL=PostBigInt.js.map