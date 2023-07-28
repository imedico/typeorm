"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupWithVeryLongName = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const src_1 = require("../../../../src");
const AuthorWithVeryLongName_1 = require("./AuthorWithVeryLongName");
let GroupWithVeryLongName = class GroupWithVeryLongName {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], GroupWithVeryLongName.prototype, "groupId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], GroupWithVeryLongName.prototype, "name", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => AuthorWithVeryLongName_1.AuthorWithVeryLongName, (author) => author.groupWithVeryLongName),
    tslib_1.__metadata("design:type", Array)
], GroupWithVeryLongName.prototype, "authorsWithVeryLongName", void 0);
GroupWithVeryLongName = tslib_1.__decorate([
    (0, src_1.Entity)()
], GroupWithVeryLongName);
exports.GroupWithVeryLongName = GroupWithVeryLongName;
//# sourceMappingURL=GroupWithVeryLongName.js.map