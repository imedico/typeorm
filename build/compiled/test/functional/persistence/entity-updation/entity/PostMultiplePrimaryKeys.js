"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMultiplePrimaryKeys = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
let PostMultiplePrimaryKeys = class PostMultiplePrimaryKeys {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostMultiplePrimaryKeys.prototype, "firstId", void 0);
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostMultiplePrimaryKeys.prototype, "secondId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ default: "Hello Multi Ids" }),
    tslib_1.__metadata("design:type", String)
], PostMultiplePrimaryKeys.prototype, "text", void 0);
PostMultiplePrimaryKeys = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], PostMultiplePrimaryKeys);
exports.PostMultiplePrimaryKeys = PostMultiplePrimaryKeys;
//# sourceMappingURL=PostMultiplePrimaryKeys.js.map