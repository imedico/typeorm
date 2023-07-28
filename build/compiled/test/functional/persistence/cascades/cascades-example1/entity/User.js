"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const Profile_1 = require("./Profile");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const src_1 = require("../../../../../../src");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Profile_1.Profile, (profile) => profile.user, {
        cascade: ["insert"],
    }),
    tslib_1.__metadata("design:type", Profile_1.Profile)
], User.prototype, "profile", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map