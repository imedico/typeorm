"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../../src/decorator/columns/Column");
let User = class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [Number, String])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map