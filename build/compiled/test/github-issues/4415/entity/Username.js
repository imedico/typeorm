"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Username = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let Username = class Username {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], Username.prototype, "username", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Username.prototype, "email", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Username.prototype, "something", void 0);
Username = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Username);
exports.Username = Username;
//# sourceMappingURL=Username.js.map