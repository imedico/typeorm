"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const Column_1 = require("../../../../src/decorator/columns/Column");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const Group_1 = require("./Group");
const Post_1 = require("./Post");
let User = class User {
    constructor() {
        this.group = new Group_1.Group();
        this.post = new Post_1.Post();
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Group_1.Group),
    tslib_1.__metadata("design:type", Group_1.Group)
], User.prototype, "group", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Post_1.Post),
    tslib_1.__metadata("design:type", Post_1.Post)
], User.prototype, "post", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "userProperty", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)(),
    tslib_1.__metadata("design:paramtypes", [])
], User);
exports.User = User;
//# sourceMappingURL=User.js.map