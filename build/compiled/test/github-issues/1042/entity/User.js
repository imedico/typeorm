"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Profile_1 = require("./Profile");
const Information_1 = require("./Information");
let User = class User {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "registeredAt", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)("json"),
    tslib_1.__metadata("design:type", Profile_1.Profile)
], User.prototype, "profile", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Information_1.Information),
    tslib_1.__metadata("design:type", Information_1.Information)
], User.prototype, "information", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map