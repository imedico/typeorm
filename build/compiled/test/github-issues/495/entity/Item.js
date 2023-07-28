"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Column_1 = require("../../../../src/decorator/columns/Column");
const Index_1 = require("../../../../src/decorator/Index");
const OneToOne_1 = require("../../../../src/decorator/relations/OneToOne");
const JoinColumn_1 = require("../../../../src/decorator/relations/JoinColumn");
const User_1 = require("./User");
let Item = class Item {
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "postId", void 0);
tslib_1.__decorate([
    (0, OneToOne_1.OneToOne)((type) => User_1.User, (users) => users.userId),
    (0, JoinColumn_1.JoinColumn)({ name: "userId" }),
    tslib_1.__metadata("design:type", User_1.User)
], Item.prototype, "userData", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], Item.prototype, "mid", void 0);
Item = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    (0, Index_1.Index)("table_index_userId_mid", (post) => [post.userId, post.mid])
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.js.map