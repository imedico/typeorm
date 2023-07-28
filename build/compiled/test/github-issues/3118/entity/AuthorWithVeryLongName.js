"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorWithVeryLongName = void 0;
const tslib_1 = require("tslib");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const src_1 = require("../../../../src");
const GroupWithVeryLongName_1 = require("./GroupWithVeryLongName");
const PostWithVeryLongName_1 = require("./PostWithVeryLongName");
let AuthorWithVeryLongName = class AuthorWithVeryLongName {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], AuthorWithVeryLongName.prototype, "authorId", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], AuthorWithVeryLongName.prototype, "firstName", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => GroupWithVeryLongName_1.GroupWithVeryLongName, (group) => group.authorsWithVeryLongName),
    tslib_1.__metadata("design:type", GroupWithVeryLongName_1.GroupWithVeryLongName)
], AuthorWithVeryLongName.prototype, "groupWithVeryLongName", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => PostWithVeryLongName_1.PostWithVeryLongName, (post) => post.authorWithVeryLongName),
    tslib_1.__metadata("design:type", Array)
], AuthorWithVeryLongName.prototype, "postsWithVeryLongName", void 0);
AuthorWithVeryLongName = tslib_1.__decorate([
    (0, src_1.Entity)()
], AuthorWithVeryLongName);
exports.AuthorWithVeryLongName = AuthorWithVeryLongName;
//# sourceMappingURL=AuthorWithVeryLongName.js.map