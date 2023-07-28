"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const UserPhoto_1 = require("./UserPhoto");
let User = class User {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => UserPhoto_1.UserPhoto, (userPhoto) => userPhoto.user, {
        cascade: true,
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "userPhotos", void 0);
User = tslib_1.__decorate([
    (0, src_1.Entity)(),
    (0, src_1.TableInheritance)({ column: { type: "varchar", name: "type" } })
], User);
exports.User = User;
//# sourceMappingURL=User.js.map