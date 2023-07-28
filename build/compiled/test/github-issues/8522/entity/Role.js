"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const BaseEntity_1 = require("./BaseEntity");
let Role = class Role extends BaseEntity_1.BaseEntity {
};
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "description", void 0);
Role = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.TableInheritance)({ column: { type: String, name: "type" } })
], Role);
exports.Role = Role;
//# sourceMappingURL=Role.js.map