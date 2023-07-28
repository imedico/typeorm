"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const EventRole_1 = require("./EventRole");
const src_1 = require("../../../../src");
let Role = class Role {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)("uuid"),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    (0, index_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((type) => EventRole_1.EventRole, (role) => role.role),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "roles", void 0);
Role = tslib_1.__decorate([
    (0, index_1.Entity)()
], Role);
exports.Role = Role;
//# sourceMappingURL=Role.js.map