"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
let Role = class Role {
};
tslib_1.__decorate([
    (0, Column_1.Column)({
        name: "role_id",
        primary: true,
        type: "int",
        generated: "increment",
        transformer: {
            to(value) {
                return value === null || value === void 0 ? void 0 : value.toString();
            },
            from(value) {
                return value === null || value === void 0 ? void 0 : value.toString();
            },
        },
    }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "roleId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "role_name" }),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "roleName", void 0);
Role = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Role);
exports.Role = Role;
//# sourceMappingURL=Role.js.map