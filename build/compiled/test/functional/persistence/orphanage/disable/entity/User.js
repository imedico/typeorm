"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Setting_1 = require("./Setting");
const OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
let User = class User {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)(() => Setting_1.Setting, (setting) => setting.user, {
        cascade: true,
        eager: true,
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "settings", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map