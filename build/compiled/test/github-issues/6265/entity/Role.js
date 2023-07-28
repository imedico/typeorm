"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const src_1 = require("../../../../src");
const User_1 = require("./User");
let Role = class Role {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Role.prototype, "title", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)((_) => User_1.User, (user) => user.role, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], Role.prototype, "users", void 0);
tslib_1.__decorate([
    (0, src_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], Role.prototype, "deleteDate", void 0);
Role = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Role);
exports.Role = Role;
//# sourceMappingURL=Role.js.map