"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const PrimaryColumn_1 = require("../../../../../src/decorator/columns/PrimaryColumn");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const OneToMany_1 = require("../../../../../src/decorator/relations/OneToMany");
const Post_1 = require("./Post");
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
    (0, OneToMany_1.OneToMany)((type) => Post_1.Post, (post) => post.counters.likedUser),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "likedPosts", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map