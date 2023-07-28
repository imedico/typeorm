"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const User_1 = require("./User");
const Photo_1 = require("./Photo");
const OneToOne_1 = require("../../../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../../../src/decorator/relations/JoinColumn");
const src_1 = require("../../../../../../src");
let Profile = class Profile {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Profile.prototype, "id", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => User_1.User, (user) => user.profile, {
        nullable: false,
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], Profile.prototype, "user", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => Photo_1.Photo, {
        nullable: false,
        cascade: ["insert"],
    }),
    (0, JoinColumn_1.JoinColumn)(),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], Profile.prototype, "photo", void 0);
Profile = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Profile);
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map