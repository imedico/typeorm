"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Role = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
var Role;
(function (Role) {
    Role["GuildMaster"] = "Guild Master";
    Role["Officer"] = "Officer";
    Role["Boss"] = "BOSS \"LEVEL 80\"";
    Role["Warrior"] = "Knight\\Rogue";
    Role[Role["Number"] = 1] = "Number";
    Role["PlayerAlt"] = "Player Alt";
})(Role = exports.Role || (exports.Role = {}));
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "enum", enum: Role, default: Role.GuildMaster }),
    tslib_1.__metadata("design:type", Object)
], User.prototype, "role", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({
        type: "enum",
        enum: Role,
        default: [Role.GuildMaster],
        array: true,
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=UserEntity.js.map