"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const shim_1 = require("../shim");
const Photo_1 = require("./Photo");
// NOTE: The relations in here make no sense, we just care for the types.
// In real applications, this would of course not work!
let User = class User {
};
tslib_1.__decorate([
    shim_1.Shim.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    shim_1.Shim.Column(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    shim_1.Shim.Column(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "someDate", void 0);
tslib_1.__decorate([
    shim_1.Shim.OneToOne(() => Photo_1.Photo),
    shim_1.Shim.JoinColumn(),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], User.prototype, "oneToOnePhoto", void 0);
tslib_1.__decorate([
    shim_1.Shim.OneToMany(() => Photo_1.Photo, (photo) => photo.user),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "oneToManyPhotos", void 0);
tslib_1.__decorate([
    shim_1.Shim.ManyToOne(() => Photo_1.Photo),
    shim_1.Shim.JoinColumn(),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], User.prototype, "manyToOnePhoto", void 0);
tslib_1.__decorate([
    shim_1.Shim.ManyToMany(() => Photo_1.Photo),
    shim_1.Shim.JoinColumn(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "manyToManyPhotos", void 0);
tslib_1.__decorate([
    shim_1.Shim.TreeParent(),
    tslib_1.__metadata("design:type", Photo_1.Photo)
], User.prototype, "treeParentPhoto", void 0);
User = tslib_1.__decorate([
    shim_1.Shim.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map