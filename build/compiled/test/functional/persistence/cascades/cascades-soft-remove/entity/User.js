"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const PrimaryColumn_1 = require("../../../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../../../src/decorator/entity/Entity");
const ManyToMany_1 = require("../../../../../../src/decorator/relations/ManyToMany");
const Photo_1 = require("./Photo");
const OneToMany_1 = require("../../../../../../src/decorator/relations/OneToMany");
const JoinTable_1 = require("../../../../../../src/decorator/relations/JoinTable");
const Column_1 = require("../../../../../../src/decorator/columns/Column");
const DeleteDateColumn_1 = require("../../../../../../src/decorator/columns/DeleteDateColumn");
let User = class User {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, DeleteDateColumn_1.DeleteDateColumn)(),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Photo_1.Photo, (photo) => photo.user, { cascade: true }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "manyPhotos", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Photo_1.Photo, { cascade: true }),
    (0, JoinTable_1.JoinTable)(),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "manyToManyPhotos", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map