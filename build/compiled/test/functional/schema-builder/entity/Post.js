"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Unique_1 = require("../../../../src/decorator/Unique");
const PrimaryColumn_1 = require("../../../../src/decorator/columns/PrimaryColumn");
const Check_1 = require("../../../../src/decorator/Check");
const Exclusion_1 = require("../../../../src/decorator/Exclusion");
let Post = class Post {
};
tslib_1.__decorate([
    (0, PrimaryColumn_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ unique: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "version", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true, default: "My post" }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "name", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "text", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "tag", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "likesCount", void 0);
Post = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Unique_1.Unique)(["text", "tag"]),
    (0, Exclusion_1.Exclusion)(`USING gist ("text" WITH =)`),
    (0, Check_1.Check)(`"likesCount" < 1000`)
    // @Check(`\`likesCount\` < 1000`) // should be properly escaped for each driver.
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map