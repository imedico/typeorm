"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../../src/decorator/entity/Entity");
const index_1 = require("../../../../../src/index");
const Column_1 = require("../../../../../src/decorator/columns/Column");
const ManyToOne_1 = require("../../../../../src/decorator/relations/ManyToOne");
const Post_1 = require("./Post");
const Counters_1 = require("./Counters");
const User_1 = require("./User");
let Photo = class Photo {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Photo.prototype, "id", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Photo.prototype, "filename", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => User_1.User),
    tslib_1.__metadata("design:type", User_1.User)
], Photo.prototype, "user", void 0);
tslib_1.__decorate([
    (0, ManyToOne_1.ManyToOne)((type) => Post_1.Post, (post) => post.photos),
    tslib_1.__metadata("design:type", Post_1.Post)
], Photo.prototype, "post", void 0);
tslib_1.__decorate([
    (0, Column_1.Column)((type) => Counters_1.Counters),
    tslib_1.__metadata("design:type", Counters_1.Counters)
], Photo.prototype, "counters", void 0);
Photo = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=Photo.js.map