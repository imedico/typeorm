"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDetails = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
let ActionDetails = class ActionDetails {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], ActionDetails.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], ActionDetails.prototype, "description", void 0);
ActionDetails = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], ActionDetails);
exports.ActionDetails = ActionDetails;
//# sourceMappingURL=ActionDetails.js.map