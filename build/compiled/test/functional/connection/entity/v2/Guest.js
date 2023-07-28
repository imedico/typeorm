"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guest = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const OneToMany_1 = require("../../../../../src/decorator/relations/OneToMany");
const Comment_1 = require("./Comment");
let Guest = class Guest {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Guest.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Guest.prototype, "username", void 0);
tslib_1.__decorate([
    (0, OneToMany_1.OneToMany)((type) => Comment_1.Comment, (comment) => comment.author),
    tslib_1.__metadata("design:type", Array)
], Guest.prototype, "comments", void 0);
Guest = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Guest);
exports.Guest = Guest;
//# sourceMappingURL=Guest.js.map