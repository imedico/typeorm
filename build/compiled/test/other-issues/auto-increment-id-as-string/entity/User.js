"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Role_1 = require("./Role");
let User = class User {
};
tslib_1.__decorate([
    (0, Column_1.Column)({
        name: "user_id",
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
], User.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ name: "user_name" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "userName", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToMany)((type) => Role_1.Role),
    (0, src_1.JoinTable)({
        name: "user_role",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "userId",
        },
        inverseJoinColumn: {
            name: "role_id",
            referencedColumnName: "roleId",
        },
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map