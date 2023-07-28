"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const User_1 = require("./User");
let Profile = class Profile {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Profile.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Profile.prototype, "about", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => User_1.User, (user) => user.profile, { eager: true }),
    tslib_1.__metadata("design:type", User_1.User)
], Profile.prototype, "user", void 0);
Profile = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map